import React, { Component } from 'react';
import './Slider.css';

// http://stackoverflow.com/questions/5898656/test-if-an-element-contains-a-class
function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

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

export const loadTouchEvent = () => {

  let currentX, prevX, direction, sliderButton;

  sliderButton = document.getElementsByClassName('slider-button')[0];

  let sliderButtonWidth = sliderButton.offsetWidth;

  // touchend 的事件回调函数
  let touchEndFunction = (e) => {
    let currentComponent = e.target;

    if (!hasClass(currentComponent, 'slider-content')) return;

    if (direction === 'left') {
      currentComponent.style.left = `-${sliderButtonWidth}px`;
    } else if (direction === 'right') {
      currentComponent.style.left = '0px';
    }

    prevX = undefined;
    currentX = undefined;

    // 取消过渡效果
    currentComponent.style.transition = '0.3s all ease-in';


    // 每次这个事件调用之后移除对应的事件，免得内存泄漏
    currentComponent.removeEventListener('touchend', touchEndFunction);
    currentComponent.touchendExist = undefined;
  }

  document.body.addEventListener('touchmove', e => {
    let currentComponent = e.target;


    // 判断是否是目标的对象
    if (!hasClass(currentComponent, 'slider-content')) return;

    currentX = e.touches[0].pageX;
    currentComponent.style.transition = '';

    let currentComponentOffset = currentComponent.offsetLeft;

    if (prevX) {
      if (currentComponentOffset <= 0 && currentComponentOffset >= -sliderButtonWidth) {

        if (currentX < prevX) {
          direction = 'left';
          currentComponent.style.left = (currentComponentOffset - 1) + 'px';

        } else {
          direction = 'right';
          currentComponent.style.left = (currentComponentOffset + 1) + 'px';
        }
      }
    }

    prevX = currentX;

    // 判断是否绑定了`touchend`事件，适用组件里面的一个属性类记录状态
    if (!currentComponent.touchendExist) {
      currentComponent.addEventListener('touchend', touchEndFunction);
      currentComponent.touchendExist = true;
    }
  });

}

export const destoryTouchEvent = () => {
  // 在React中使用DOM原声事件的时候一定要在组件卸载的时候手动移除，以免内存泄漏  
  document.body.removeEventListener('touchmove');
}

export default Slider;
