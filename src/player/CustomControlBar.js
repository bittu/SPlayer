import React, { Component } from 'react';
import classNames from 'classnames';
import Animate from 'rc-animate';
import LoadingIndicatorDots from '../LoadingIndicatorDots';
import ActionLogos, { 
  LEFT_CHEVRON_EXPORT,
  PLAY,
  PAUSE,
  FULLSCREEN,
  EXIT_FULLSCREEN,
  VOLUME,
  SUBTITLES,
  EPISODE_LIST
} from '../ActionLogos';
import Tooltip from '../Tooltip';

export default class CustomControlBar extends Component {

  state = {
    playing: false,
    duration: '00:00',
    currentTime: '00:00',
    seekValue: 0,
    isFullScreen: false,
    muted: false,
    volume: 0,
    showVolumeBar: false,
    showInfoLayer: false,
    showControlBar: true,
    showTitleLayer: false,
    showLoading: true,
    showSeekTime: false,
    seekPositionX: 0,
    seekPositionTime: ""
  }

  componentDidMount() {
    this.setUpPlayer();
    document.addEventListener('fullscreenchange', this.handleFullScreenEvent);
 		document.addEventListener('webkitfullscreenchange', this.handleFullScreenEvent);
 		document.addEventListener('MSFullscreenChange', this.handleFullScreenEvent);
    document.addEventListener('mozfullscreenchange', this.handleFullScreenEvent);
    document.addEventListener('fullscreenChange', this.handleFullScreenEvent);
    // this.props.setPlayer(this.props.player);
  }

  componentWillUnmount() {
    document.removeEventListener('fullscreenchange', this.handleFullScreenEvent);
    document.removeEventListener('webkitfullscreenchange', this.handleFullScreenEvent);
    document.removeEventListener('MSFullscreenChange', this.handleFullScreenEvent);
    document.removeEventListener('mozfullscreenchange', this.handleFullScreenEvent);
    document.removeEventListener('fullscreenChange', this.handleFullScreenEvent);
    this.cleanUpPlayer();
  }

  setUpPlayer = () => {
    this.props.player.addEventListener('play', this.handlePlay);
    this.props.player.addEventListener('pause', this.handlePause);
    this.props.player.addEventListener('ended', this.handlePlayEnded);
    this.props.player.addEventListener('durationchange', this.handleDurationChange);
    this.props.player.addEventListener('loadedmetadata', this.startPlayer.bind(this, 'loadedmetadata'));
    this.props.player.addEventListener('timeupdate', this.handleTimeUpdated);
    this.props.player.addEventListener('waiting', this.handleWaiting);
    this.props.player.addEventListener('playing', this.handlePlay)
    this.props.player.addEventListener('canplay', this.startPlayer.bind(this, 'canplay'));
    // TODO: handle seeking buffering loading events
    this.setState({
      muted: this.props.player.muted,
      volume: this.props.player.volume
    });
  }

  startPlayer = (e) => {
    console.log('startplayer', e)
    this.props.player.play();
    this.handleDurationChange();
    this.handleOverlayMouseMove();
    // this.jumpSeekTo(this.props.elapsedWatchTime);
  }

  cleanUpPlayer = () => {
    clearTimeout(this._overlayTimeout);
    clearTimeout(this._volumeTimeout);
    this.props.player.removeEventListener('play', this.handlePlay);
    this.props.player.removeEventListener('pause', this.handlePause);
    this.props.player.removeEventListener('ended', this.handlePlayEnded);
    this.props.player.removeEventListener('durationchange', this.handleDurationChange);
    this.props.player.removeEventListener('loadedmetadata', this.startPlayer);
    this.props.player.removeEventListener('timeupdate', this.handleTimeUpdated);
    this.props.player.removeEventListener('waiting', this.handleWaiting);
    this.props.player.removeEventListener('playing', this.handlePlay)
    this.props.player.pause();
    this.props.player.destroy();
  }

  handleDurationChange = () => {
    console.log('handledurationchange')
    const duration = this.props.player.duration;
    const minutes = parseInt(duration / 60, 10);
		const seconds = parseInt(duration % 60, 10);
    this.setState({
      duration: `${minutes > 10 ? minutes : `0${minutes}`}:${seconds > 10 ? seconds : `0${seconds}`}`
    });
  }

  handleTimeUpdated = (e) => {
    const currentTime = this.props.player.currentTime;
    const minutes = parseInt(currentTime / 60, 10);
		const seconds = parseInt(currentTime % 60, 10);
    this.setState({
      currentTime: `${minutes > 10 ? minutes : `0${minutes}`}:${seconds > 10 ? seconds : `0${seconds}`}`,
      seekValue: (100 / this.props.player.duration) * currentTime,
      showLoading: false
    });
  }

  handleWaiting = () => {
    this.setState({
      showLoading: true
    })
  }

  handleVolumeChange = () => {
    this.props.player.muted = !this.props.player.muted;
  }

  handleToggleFullScreen = () => {
    const ele = this.props.player.element.parentNode;

    ele.requestFullscreen = ele.requestFullscreen
                            || ele.webkitRequestFullscreen
                            || ele.msRequestFullscreen
                            || ele.mozRequestFullScreen;
    document.exitFullscreen = document.exitFullscreen
                              || document.msExitFullscreen
                              || document.mozCancelFullScreen
                              || document.webkitExitFullscreen;

    if (this.isFullScreen()) {
			document.exitFullscreen();
      this.setFullScreenState(false);
		} else {
      ele.requestFullscreen();
      this.setFullScreenState(true);
		}
  }

  handleFullScreenEvent = (e) => {
    this.setFullScreenState(this.isFullScreen());
    this.handleOverlayMouseMove();
  }

  isFullScreen = () => {
 		return !!(document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
 	}

  setFullScreenState = (isFullScreen) => {
    this.setState({isFullScreen});
  }

  handleSeekMouseDown = () => {
    this._isPlayingOnMouseDown = this.state.playing;
    this.props.player.pause();
  }

  handleSeekMouseUp = ({ target: { value } }) => {
    if (!this._onChangeUsed) {
      this.seekTo(value)
    }

    if (this._isPlayingOnMouseDown) {
      this.props.player.play()
    }
  }

  handleSeekChange = ({ target: { value } }) => {
    this.seekTo(value)
    this._onChangeUsed = true
  }

  seekTo = (value) => {
    this.props.player.currentTime = value * this.props.player.duration / 100;
    this.setState({
      seekValue: (100 / this.props.player.duration) * this.props.player.currentTime
    })
  }

  jumpSeekTo = (value) => {
    this.props.player.currentTime = value;
  }

  handleVolumeChange = ({ target: { value } }) => {
    this.props.player.volume = value;
    this.setState({
      volume: value,
      muted: parseFloat(value, 10) === 0 ? true : false
    })
  }

  handleToggleMute = () => {
    if (this.props.player.muted) {
      this.props.player.muted = false;
    } else {
      this.props.player.muted = true
    }
    this.setState({
      muted: this.props.player.muted,
      volume: this.props.player.muted ? 0 : this.props.player.volume
    });
  }

  handlePlay = () => {
    this.setState({
      playing: true,
      showLoading: false
    });
  }

  handlePause = () => {
    this.setState({playing: false});
  }

  handlePlayEnded = () => {
    this.setState({playing: false});
  }

  handleToggleVolumeBar = () => {
    clearTimeout(this._volumeTimeout);
    this.setState({
      showVolumeBar: true
    })
    this._volumeTimeout = setTimeout(() => {
      this.setState({
        showVolumeBar: false
      });
    }, 2000);
  }

  handleOverlayMouseMove = () => {
    console.log('handleoverlaymousemove')
    clearTimeout(this._overlayTimeout);
    const {
      isFullScreen
    } = this.state;
    this.setState({
      showControlBar: true,
      showTitleLayer: isFullScreen && true
    })
    this._overlayTimeout = setTimeout(() => {
      const {
        showVolumeBar,
        showInfoLayer,
        showSeasonLayer
      } = this.state;
      // if (!showVolumeBar && !showInfoLayer && !showSeasonLayer) {
      //   this.setState({
      //     showControlBar: false,
      //     showTitleLayer: false
      //   })
      // } else {
      //   this.handleOverlayMouseMove();
      // }
    }, 5000);
  }

  handleShowSeekTime = (event) => {
    clearTimeout(this._seekTimeDisplay);
    const { showSeekTime } = this.state;
    if (!showSeekTime) {
      this.setState({ showSeekTime: !showSeekTime });
    }
    const currentTimeInSec = Math.round((((event.nativeEvent.offsetX) / event.target.clientWidth)*this.props.player.duration));
    const minutes = parseInt(currentTimeInSec / 60, 10).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
		const seconds = parseInt(currentTimeInSec % 60, 10).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    this.setState({
      seekPositionX: event.pageX,
      seekPositionTime: `${minutes}:${seconds}`
    });
    this._seekTimeDisplay = setTimeout(() => {
      if (showSeekTime) {
        this.setState({ showSeekTime: !showSeekTime });
      }
    }, 3000)
  };

  togglePlay = () => {
    if (this.props.player.paused) {
      this.props.player.play();
    } else {
      this.props.player.pause();
    }
  }

  handleKeyPress = (event) => {
    const { keyCode } = event;
    if (keyCode === 0){
      this.togglePlay();
    }
  }

  getBufferedPercentage = () => `${this.props.player && this.props.player.buffered && this.props.player.buffered.length > 0 ? this.props.player.buffered.end(this.props.player.buffered.length - 1) / this.props.player.duration * 100 : 0}%`

  getPlayedPercentage = () => `${this.props.player ? this.props.player.currentTime / this.props.player.duration * 100 : 0}%`

  getVolumePercentage = () => `${this.state.volume * 100}%`

  getPlayPauseIcon = (playing) => {
    if (playing) {
      // return <Icon type={PAUSE_ICON}/>
      return <ActionLogos logoType={PAUSE}/>
    } else {
      // return <Icon type={PLAY_ICON}/>
      return <ActionLogos logoType={PLAY}/>
    }
  }

  getFullScreenIcon = (isFullScreen) => {
    if (isFullScreen) {
      // return <Icon type={EXIT_FULLSCREEN_ICON}/>
      return <ActionLogos logoType={EXIT_FULLSCREEN}/>
    } else {
      // return <Icon type={FULLSCREEN_ICON}/>
      return <ActionLogos logoType={FULLSCREEN}/>
    }
  }

  goBack = () => {
    console.log("going back");
    // this.props.router.push('/');
  }

  handleToggleTexTrack = () => {
    console.log("Toggling text track");
  };

  handleToggleEpisodelist = () => {
    console.log("Toggling the episodelist view toggle")
  };

  render () {
    const {
      playing,
      duration,
      currentTime,
      seekValue,
      isFullScreen,
      muted,
      volume,
      showVolumeBar,
      showInfoLayer,
      showControlBar,
      showTitleLayer,
      showLoading,
      showSeasonLayer,
      showSeekTime,
      seekPositionX,
      seekPositionTime
    } = this.state;

    const wrapperClassNames = classNames('player-wrapper', {
      'player-fullscreen': isFullScreen
    })

    const wrapperStyle = {
      width: '100%',
      height: '100%',
      // margin: '0 1%',
      boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    }

    return (
      <Animate transitionName="fade">
        <div className={wrapperClassNames} style={wrapperStyle}>
          {showLoading && <div className="player-loading">
            <LoadingIndicatorDots className={true} />
          </div>}
          <div className="player-skin__actionArea" onClick={this.togglePlay} onMouseMove={this.handleOverlayMouseMove} tabIndex="0" onKeyPress={this.handleKeyPress}></div>
          <Animate transitionName="fade">
          {showControlBar && <div className="player-topbar">
          <div className="player-topbar__back" onClick={this.goBack}>
            <ActionLogos logoType={LEFT_CHEVRON_EXPORT} className="player-topbar__backChevron"/>
            <span>Back</span>
          </div>
          </div>}
          </Animate>
          
          <Animate transitionName="fade">
            {showControlBar && <div className="player-controlBar">
            <div className="player-controlBar__seekBarContainer">
            {showSeekTime && <Tooltip locationX={seekPositionX} value={seekPositionTime}/>}
            <div className="player-controlBar__seekBar" >
                <div className="player-controlBar__seekTrack">
                  <div className="player-controlBar__seekBuffer" style={{ width: this.getBufferedPercentage() }}></div>
                  <div className="player-controlBar__seekFill" style={{ width: this.getPlayedPercentage() }}></div>
                  <input type="range" orient="horizontal" className="player-controlBar__seekRange" value={seekValue} step="0.0000000000000001"
                    onMouseDown={this.handleSeekMouseDown}
                    onMouseUp={this.handleSeekMouseUp}
                    onChange={this.handleSeekChange}
                    onMouseMove={this.handleShowSeekTime}
                    />
                </div>
              </div>
              <time className="player-controlBar__elapsedTime">{currentTime} / </time>
              <time className="player-controlBar__totalTime">{duration}</time>
            </div>
            <div className="player-controlBar__controlsContainer">
              <button className="player-controlBar__play" onClick={this.togglePlay}>{this.getPlayPauseIcon(playing)}</button>
              <div className="player-controlBar__volume"
                  onMouseOver={this.handleToggleVolumeBar}>
                <button className="player-controlBar__volumeButton" onClick={this.handleToggleMute} style={{opacity: `${muted ? '0.5' : '1'}`}}>
                  <ActionLogos logoType={VOLUME} />
                </button>
                  <Animate transitionName="fade">
                    {showVolumeBar && <div className="player-controlBar__volumeBar" key="1" onMouseOver={this.handleToggleVolumeBar} onMouseMove={this.handleToggleVolumeBar}>
                      <div className="player-controlBar__volumeTrack">
                        <div className="player-controlBar__volumeFill" style={{ width: this.getVolumePercentage() }}></div>
                        <input type="range" className="player-controlBar__volumeRange" min="0" max="1" step="0.01" value={volume}
                          onChange={this.handleVolumeChange} />
                        </div>
                    </div>}
                  </Animate>
              </div>
              <div className="player-infoLayer">
               {/* {`{item._episodeNumber}`} */}14. {/* {item._title} */}The Winter is coming and I am freezing
              </div>
              <div className="player-controlBar__fullScreen">
              <button  onClick={this.handleToggleFullScreen}><ActionLogos logoType={SUBTITLES} /></button>
              <button  onClick={this.handleToggleFullScreen}><ActionLogos logoType={EPISODE_LIST} /></button>
              <button  onClick={this.handleToggleFullScreen}>{this.getFullScreenIcon(isFullScreen)}</button>
              </div>
            </div>
            </div>
            }
          </Animate>
        </div>
      </Animate>
    )
  }
}