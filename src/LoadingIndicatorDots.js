import React, {Component} from 'react';

class LoadingIndicatorDots extends Component{

  render(){
    return <div className={`dotsContainer center`} style={this.props.loaderStyles}>
        <div style={this.props.mainLoadingContaner}>
          <span className={this.props.size ? "dot1_" + this.props.size : "dot1"}> </span>
          <span className={this.props.size ? "dot2_" + this.props.size : "dot2"}> </span>
          <span className={this.props.size ? "dot3_" + this.props.size : "dot3"}> </span>
        </div>
    </div>
  }
}
export default LoadingIndicatorDots;
