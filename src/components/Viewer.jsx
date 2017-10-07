import React from 'react';
import styled from 'react-emotion';
import { getType, MEDIA_TYPES } from '../api/electron';
import Image from './LazyImage';
import Video from './Video';
import Audio from './Audio';

const TypeViewers = {
  [MEDIA_TYPES.image]: file => <Image source={file} />,
  [MEDIA_TYPES.video]: file => <Video source={file} />,
  [MEDIA_TYPES.audio]: file => <Audio source={file} />,
};
const Container = styled.div({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Viewer = ({ file }) => {
  try {
    const type = getType(file);
    return <Container>{TypeViewers[type](file)}</Container>;
  } catch (e) {
    return <div>Unkown</div>;
  }
};

export default Viewer;
