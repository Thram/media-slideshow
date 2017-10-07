import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Overlay extends Component {
  constructor(props) {
    super(props);
    this.overlayContainer = document.createElement('div');
    document.body.appendChild(this.overlayContainer);
  }

  render = () =>
    ReactDOM.createPortal(
      <div className="overlay">{this.props.children}</div>,
      this.overlayContainer,
    );
}

export default Overlay;
