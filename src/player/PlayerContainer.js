import React, { Component } from 'react'
import Animate from 'rc-animate';
import queryString from 'query-string'

import TheoPlayer from 'theoPlayer/THEOplayer.chromeless';
import LoadingIndicatorDots from '../LoadingIndicatorDots'

// import 'theoPlayer/ui.css';
import './player.css';
import CustomControlBar from './CustomControlBar';
import { items } from '../App';

const imgUrl = "https://imagesng.cdn.vision.bt.com/ImageTransformationService?width=1280&height=720&url=<PACKSHOT_URL>";

export default class PlayerContainer extends Component {

  state = {
    loaded: false
  }

  componentDidMount() {
    window.theoPlayer = new TheoPlayer.Player(this._videoContainer, {
      libraryLocation: 'lib/theoPlayer/'
    });
    console.log('player inited')
    window.theoPlayer.preload = 'auto';
    // window.theoPlayer.autoplay = true;
    this.mockRequestToPlay()
    .then(res => {
      window.theoPlayer.source = {
        poster: imgUrl,
        sources: [{
          src: '//cdn.theoplayer.com/video/star_wars_episode_vii-the_force_awakens_official_comic-con_2015_reel_(2015)/index.m3u8',
          type: 'application/x-mpegurl'
        }]
      };
      console.log('player source set')
    });

    window.theoPlayer.addEventListener('loadeddata', () => {
      console.log('loadeddata')
      this.setState({
        loaded: true
      })
    })

    // window.theoPlayer.addEventListener('loadedmetadata', () => {
    //   console.log('loadedmetadata')
    //   // console.log('play called')
    //     // window.theoPlayer.play();
    // })

    // window.theoPlayer.addEventListener('playing', () => {
    //   console.log('playing')
    //   this.setState({
    //     playing: true
    //   })
    // })

  }

  mockRequestToPlay = () => {
    return new Promise(resolve => {
      setTimeout(_ => {
        resolve({
          src: '//cdn.theoplayer.com/video/star_wars_episode_vii-the_force_awakens_official_comic-con_2015_reel_(2015)/index.m3u8'
        })
      }, 5000)
    })
  }

  render() {
    const {
      loaded
    } = this.state;
    const query = queryString.parse(this.props.location.search);
    return (
      <div style={{width: '100%', height: '100%'}}>
        <div className="theoplayer-container video-js theoplayer-skin" ref={r => this._videoContainer = r}></div>
        {loaded
        &&  <CustomControlBar
          player={window.theoPlayer}
        ></CustomControlBar>
        }
        <Animate
          transitionAppear={true}
          transitionName="fade"
        >
          {!loaded
          && <div className="startupLoading">
              <img src={imgUrl.replace('<PACKSHOT_URL>', items[query.p].packshot)} alt="poster" className="player-poster"></img>
              <LoadingIndicatorDots></LoadingIndicatorDots>
            </div>
          }
        </Animate>
      </div>
    )
  }
}