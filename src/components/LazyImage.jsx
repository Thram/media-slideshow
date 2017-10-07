import React, { Component } from 'react';
import { isEqual } from 'lodash';
import styled from 'react-emotion';
import { preload } from '../utils';

const Image = styled.div(
  {
    width: '100%',
    height: '100%',
    transition: 'background 1s ease',
    backgroundImage:
      'url("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7")',
    backgroundPosition: 'center',
    backgroundRepeat: 'repeat',
  },
  ({ loaded, source }) =>
    (loaded
      ? {
        backgroundImage: `url("${source}")`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
      }
      : {
        backgroundColor: '#747474',
      }),
);

class LazyImage extends Component {
  state = { loaded: false, error: false };
  componentDidMount = () => {
    this.load(this.props);
  };
  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps, this.props)) this.load(nextProps);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(nextState, this.state);
  }

  load = async ({ source, resample }) => {
    try {
      const url = await preload(source, resample);
      this.setState({ loaded: true, url });
    } catch (e) {
      this.setState({ error: true });
    }
  };

  render = () =>
    (this.state.error ? (
      'Somthing went wrong...'
    ) : (
      <Image {...this.props} loaded={this.state.loaded} source={this.state.url} />
    ));
}

export default LazyImage;
