import React, { Component } from 'react';

const COLORS = {
  black: 'color: black;',
  red: 'color: crimson;',
  green: 'color: teal;',
  blue: 'color: cornflowerblue;',
};
const WEIGHTS = {
  bold: 'font-weight: bold;',
  normal: 'font-weight: normal;',
};

const redTitle = `${COLORS.red} ${WEIGHTS.bold}`;

class ErrorHandler extends Component {
  state = { hasError: false };

  componentDidCatch(error, info) {
    this.setState(state => ({ ...state, hasError: true }));
    console.group('%cError!:', redTitle);
    console.log('Error:', error);
    console.log('Error Info:', info);
    console.groupEnd();
  }

  render = () =>
    (this.state.hasError ? <div>Sorry, something went wrong...</div> : this.props.children);
}

export default ErrorHandler;
