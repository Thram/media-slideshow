import React from 'react';
import styled from 'react-emotion';
import { DefaultPlayer } from 'react-html5video';
import 'react-html5video/dist/styles.css';

const DEFAULT_CONTROLS = ['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen'];

const Container = styled.div({ flex: 1 });

const Video = ({ source, controls = DEFAULT_CONTROLS, ...props }) => (
  <Container>
    <DefaultPlayer {...props} controls={controls}>
      <source src={source} />
    </DefaultPlayer>
  </Container>
);

export default Video;
