import React from 'react';
import styled from 'react-emotion';
import LazyImage from './LazyImage';

const THUMBNAIL_SIZE = 100;
const BORDER_SIZE = 2;
const OFFSET_SIZE = BORDER_SIZE * 2;

const Container = styled.div(
  {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: `${THUMBNAIL_SIZE}px`,
    transition: 'transform .4s ease, opacity .4s ease',
    overflowX: 'auto',
  },
  ({ show }) =>
    (show
      ? { transform: 'translateY(0)', opacity: 1 }
      : { transform: 'translateY(100%)', opacity: 0 }),
);
const Reel = styled.div(({ size = 0 }) => ({ width: `${size * THUMBNAIL_SIZE}px` }));
const Thumbnail = styled.div(
  {
    width: `${THUMBNAIL_SIZE - OFFSET_SIZE}px`,
    height: `${THUMBNAIL_SIZE - OFFSET_SIZE}px`,
    border: `${BORDER_SIZE}px solid`,
    borderRadius: '4px',
    float: 'left',
    transition: 'border-color 1s ease',
    overflow: 'hidden',
  },
  ({ current }) => ({ borderColor: current ? 'crimson' : 'transparent' }),
);

const Navigation = ({
  files, current, onSelect, show,
}) => (
  <Container show={show}>
    <Reel size={files.length}>
      {files.map((file, index) => (
        <Thumbnail key={file} current={current === index} onClick={() => onSelect(index)}>
          <LazyImage source={file} resample={{ width: THUMBNAIL_SIZE, height: THUMBNAIL_SIZE }} />
        </Thumbnail>
      ))}
    </Reel>
  </Container>
);

export default Navigation;
