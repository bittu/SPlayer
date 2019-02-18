import React, { Component } from 'react';
import classNames from 'classnames';

/*constant variables*/
export const CLOSE_ICON = "CLOSE_ICON";
export const EPG_TRIANGLE = "EPG_TRIANGLE";
export const CATCH_UP_ICON = "CATCH_UP_ICON";
export const LARGE_CROSS = "LARGE_CROSS";
export const INFO = "INFO";
export const LEFT_CHEVRON_EXPORT = 'LEFT_CHEVRON';
export const INFO_CIRCLE = 'INFO_CIRCLE';
export const PLAY = 'PLAY';
export const PAUSE = 'PAUSE';
export const VOLUME = 'VOLUME';
export const FULLSCREEN = 'FULLSCREEN';
export const EXIT_FULLSCREEN = 'EXIT_FULLSCREEN';
export const CHEVRON_DOWN = 'CHEVRON_DOWN';
export const EXTRA_INFO = 'EXTRA_INFO';
export const SUBTITLES = 'SUBTITLES';
export const EPISODE_LIST = 'EPISODE_LIST';

const LOGIN = 'login';
const LOGOUT = 'logout';
const AD = "AD";
const SUB = "SUB";
const U = 'U';
const _12 = '12';
const _15 = '15';
const _18 = '18';
const PG = 'PG';
const CHECKED = 'verifiedLogo';
const DEVICESlOGO = 'devicesLogo';
//const RIGHT_CHEVRON='RIGHT_CHEVRON';
const LEFT_CHEVRON = 'LEFT_CHEVRON';
const  ACTIONLOGO = 'actionLogo';
const DELETE = 'delete';
class ActionLogos extends Component {
  returnLogoJsx(logoType){
    let {
      isClickable,
      logoPosition
    } = this.props;

    let classNameForSideMenuIcon = this.props.classNameForSideMenuIcon || ''

    let className;
    className = classNames({
      'actionLogo': ACTIONLOGO,
      'isClickable': isClickable,
      'closeIcon': logoType === LARGE_CROSS,
      'leftChevron': logoType === LEFT_CHEVRON
    });
		let logoJsx;
    logoPosition = logoPosition || 'pull-left'
		switch (logoType){
      case EPISODE_LIST:
        logoJsx = <span className={className}>&#xE859;</span>
        break;
      case SUBTITLES:
        logoJsx = <span className={className}>&#xE842;</span>
        break;
      case LEFT_CHEVRON_EXPORT:
        logoJsx = <span className={className}>&#xE804;</span>
        break;
			case CLOSE_ICON:
				logoJsx = <p className="closeIcon">&#xE806;</p>;
				break;
			case CATCH_UP_ICON:{
				logoJsx = <span className={className}>&#xE809;</span>
				break;
			}
			case EPG_TRIANGLE:{
				logoJsx = <span className={className   + classNameForSideMenuIcon}>&#xE850;</span>
				break;
			}
      case LARGE_CROSS:{
        logoJsx = <span className={className + ' '  + classNameForSideMenuIcon}>&#xE806;</span>;
        break;
      }
      case LEFT_CHEVRON:{
        logoJsx = <span className={className + ' '  + classNameForSideMenuIcon}>&#xE804;</span>;
        break;
      }
      case LOGIN:{
        logoJsx = <span className={className + ' ' + classNameForSideMenuIcon}>&#xE810;</span>;
        break;
      }
      case LOGOUT:{
        logoJsx = <span className={className + ' ' + classNameForSideMenuIcon}>&#xE811;</span>;
        break;
      }
      case AD:{
        logoJsx = <span className={className + ' ' + classNameForSideMenuIcon}>&#xE831;</span>;
        break;
      }
      case SUB:{
        logoJsx = <span className={className + ' ' + classNameForSideMenuIcon}>&#xE832;</span>;
        break;
      }
      case INFO: {
        logoJsx = <span className={className + ' ' + classNameForSideMenuIcon}>&#xE827;</span>;
        break;
      }
      case U:{
        logoJsx = <span className={className + ' ' + classNameForSideMenuIcon}>&#xE825;</span>;
        break;
      }
      case _12:{
        logoJsx = <span className={className + ' ' + classNameForSideMenuIcon}>&#xE821;</span>;
        break;
      }
      case _15:{
        logoJsx = <span className={className + ' ' + classNameForSideMenuIcon}>&#xE822;</span>;
        break;
      }
      case _18:{
        logoJsx = <span className={className + ' ' + classNameForSideMenuIcon}>&#xE823;</span>;
        break;
      }
      case PG:{
        logoJsx = <span className={className + ' ' + classNameForSideMenuIcon}>&#xE824;</span>;
        break;
      }
      case INFO_CIRCLE:{
        logoJsx = <span className={className + ' ' + classNameForSideMenuIcon}>&#xE840;</span>;
        break;
      }
      case CHECKED:{
        logoJsx = <span className={className + ' ' + classNameForSideMenuIcon}>&#xE871;</span>;
        break;
      }
      case DEVICESlOGO:{
        logoJsx = <span className={className + ' ' + classNameForSideMenuIcon}>&#xEF25;</span>;
        break;
      }
      case DELETE:{
        logoJsx = <span className={className + ' ' + classNameForSideMenuIcon}>&#xE851;</span>;
        break;
      }
      case PLAY:{
        logoJsx = <span className={className + ' ' + classNameForSideMenuIcon}>&#xEF0A;</span>;
        break;
      }
      case PAUSE:{
        logoJsx = <span className={className + ' ' + classNameForSideMenuIcon}>&#xEF0B;</span>;
        break;
      }
      case VOLUME:{
        logoJsx = <span className={className + ' ' + classNameForSideMenuIcon}>&#xE855;</span>;
        break;
      }
      case FULLSCREEN:{
        logoJsx = <span className={className + ' ' + classNameForSideMenuIcon}>&#xE856;</span>;
        break;
      }
      case EXIT_FULLSCREEN:{
        logoJsx = <span className={className + ' ' + classNameForSideMenuIcon}>&#xE857;</span>;
        break;
      }
      case CHEVRON_DOWN:{
        logoJsx = <span className={className + ' ' + classNameForSideMenuIcon}>&#xE802;</span>;
        break;
      }
      case EXTRA_INFO:{
        logoJsx = <span className={className + ' ' + classNameForSideMenuIcon}>&#xE847;</span>;
        break;
      }
			default:{
				break;
			}
		}
		return <span className={logoPosition}>
			{logoJsx}
		</span>
	}
	render() {
		let {logoType} = this.props;
		return (
			<span className='ActionLogoWrapper' onClick={this.props.onClick}>
				{this.returnLogoJsx(logoType)}
			</span>
		);
	}
}

export default ActionLogos;
