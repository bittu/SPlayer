import React, { Component } from 'react'
import { items } from './App';

const homeStyle = {
  padding: '20px'
}

const imgUrl = "https://imagesng.cdn.vision.bt.com/ImageTransformationService?width=512&height=288&url=<PACKSHOT_URL>";

export default class Home extends Component {

  handlePlay = (v) => {
    this.props.history.push('/player?p=' + v);
  }

  render() {
    return (
      <div style={homeStyle}>
        <ul style={{listStyle: 'none', display: 'flex'}}>
          {items.map((v, i) => {
            return (
              <li key={i} className={'packshot-wrapper'}>
                <div className="packshot-img-container" onClick={_ => this.handlePlay(i)}>
                  <img src={imgUrl.replace('<PACKSHOT_URL>', v.packshot)} alt={v.displayTitle} className="packshot__img"/>
                </div>
                <div className="packshot-info-container">
                  <div className="packshot-info__description">
                    <div className="packshot-info__title">{v.displayTitle}</div>
                    <div className="packshot-info__strapline">{v.genres.join(' ')}</div>
                  </div>
                </div>
              </li>
            )
          })
        }
        </ul>
      </div>
    )
  }
}