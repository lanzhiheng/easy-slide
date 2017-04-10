import React, { Component } from 'react';
import './Slider.css';

class Slider extends Component {
  constructor() {
    super();
    this.handleSliderButtonClick = this.handleSliderButtonClick.bind(this);
  }

  handleSliderButtonClick(e) {
    let sliderButton = e.target;
    let sliderWrap = sliderButton.parentNode;
    sliderWrap.style.opacity = '0';
    sliderWrap.style.transition = '0.5s all ease-in';

    setTimeout(() => {
      sliderWrap.style.display = 'none';
    }, 500)
  }

  render() {
    let contentText = this.props.children;

    return (
      <div className="slider-wrap">
        <a className="slider-content">{contentText}</a>
        <a onClick={this.handleSliderButtonClick} className="slider-button">Delete</a>
      </div>
    );
  }
}


export default Slider
