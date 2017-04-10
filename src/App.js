import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Slider from './Slider/Slider';


const data = [
  "Lan",
  "Zhang",
  "Wang",
  "Liang",
  "Lin",
  "Huang",
  "Yang"
]


// http://stackoverflow.com/questions/5898656/test-if-an-element-contains-a-class
function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

class App extends Component {

  componentDidMount() {

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

  componentWillUnmount() {
    // 在React中使用DOM原声事件的时候一定要在组件卸载的时候手动移除，以免内存泄漏
    document.body.removeEventListener('touchmove');
  }

  render() {
    return (
      <div className="App">
        {data.map(item => {
          return <Slider key={item}>{item}</Slider>
        })}

      </div>
    );
  }
}

export default App;
