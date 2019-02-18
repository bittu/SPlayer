import React, { Component } from 'react';

import './Tooltip.css'

class Tooltip extends Component{
  render(){
    const {
      value,
      locationX,
      locationY
    } = this.props;
    const tolltipStyle = {
      position: "absolute",
      top: "5px",
      left: locationX,
      zIndex: 5 
    };
    return <div style={tolltipStyle}>{value}</div>
  }

  mapStateToProps(){
    return({
      value: this.props.value,
      location: this.props.locatioinX,
      locationY: this.props.locationY
    });
  }
}

export default Tooltip