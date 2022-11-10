import React, { Component } from 'react';

class App extends Component {
  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick, false);
  }

  handleDocumentClick = (e) => {
    console.log('handleDocumentClick: ', e);
  };

  handleClickTestBox = (e) => {
    console.warn('handleClickTestBox: ', e);
  };

  handleClickTestBox2 = (e) => {
    console.warn('handleClickTestBox2: ', e);
  };

  handleClickTestBox3 = (e) => {
    // 阻止合成事件的冒泡
    e.stopPropagation();
    // 阻止与原生事件的冒泡
    // e.nativeEvent.stopImmediatePropagation();
    console.warn('handleClickTestBox3: ', e);
  };

  render() {
    return (
      <div className="test-box text-5xl" onClick={this.handleClickTestBox}>
        <div onClick={this.handleClickTestBox2}>
          <div
            className="text-pink-900 italic"
            onClick={this.handleClickTestBox3}
          >
            BOX3
          </div>
        </div>
      </div>
    );
  }
}

export default App;
