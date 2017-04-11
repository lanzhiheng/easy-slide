import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Slider, {loadTouchEvent, destoryTouchEvent} from './Slider/Slider';


const data = [
  "Lan",
  "Zhang",
  "Wang",
  "Liang",
  "Lin",
  "Huang",
  "Yang"
]


class App extends Component {

  componentDidMount() {

    // 绑定touch事件
    loadTouchEvent();
  }

  componentWillUnmount() {

    // 删除touch事件
    destoryTouchEvent();
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
