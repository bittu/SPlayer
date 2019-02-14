import React, { Component } from 'react';

export const SETTINGS_ICON = 'SETTINGS_ICON';
export const PLAY_ICON = 'PLAY_ICON';
export const INFO_ICON = 'INFO_ICON'
export const BROWSER_ICON = 'BROWSER_ICON';
export const DELETE_ICON = 'DELETE_ICON';
export const PAUSE_ICON = 'PAUSE_ICON';
export const VOLUME_ICON = 'VOLUME_ICON';
export const FULLSCREEN_ICON = 'FULLSCREEN_ICON';
export const EXIT_FULLSCREEN_ICON = 'EXIT_FULLSCREEN_ICON';
export const CHEVRON_DOWN = 'CHEVRON_DOWN';
export const CLOSE_ICON = 'CLOSE_ICON';
export const EXTRA_INFO_ICON = 'EXTRA_INFO_ICON';
export const FAV_FILLED_ICON = 'FAV_FILLED_ICON';
export const LOGIN_ICON = 'LOGIN_ICON';

class Icon extends Component {

	getEntity(type) {
		switch (type) {

			case SETTINGS_ICON: return <span>&#xE816;</span>;

			case PLAY_ICON: return <span>&#xE813;</span>;

			case INFO_ICON: return <span>&#xE840;</span>;

			case BROWSER_ICON: return <span>&#xE864;</span>;

			case DELETE_ICON: return <span>&#xE851;</span>;

			case PAUSE_ICON: return <span>&#xEF0B;</span>;

			case VOLUME_ICON: return <span>&#xE855;</span>;

			case FULLSCREEN_ICON: return <span>&#xE856;</span>;

			case EXIT_FULLSCREEN_ICON: return <span>&#xE857;</span>;

			case CHEVRON_DOWN: return <span>&#xE802;</span>;

			case CLOSE_ICON: return <span>&#xE806;</span>;

			case EXTRA_INFO_ICON: return <span>&#xE847;</span>;

			case LOGIN_ICON: return <span>&#xEF08;</span>;

			default: return '';
		}
	}

	render() {
		const {
			type,
			className = '',
			clickHandler
		} = this.props;

		return	<span className={`font-icon ${className}`} onClick={clickHandler}>{this.getEntity(type)}</span>
	}
}

export default Icon;