import React from 'react';
import styled from 'react-emotion';
import AudioPlayer from 'react-responsive-audio-player';
import 'react-responsive-audio-player/dist/audioplayer.css';

const Container = styled.div({ flex: 1, margin: '10%' });

const Audio = ({ source = '', ...props }) => (
  <Container>
    <AudioPlayer
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)' }}
      playlist={[
        {
          url: source,
          displayText: source,
        },
      ]}
      hideBackSkip
      hideForwardSkip
      {...props}
    />
  </Container>
);

export default Audio;
