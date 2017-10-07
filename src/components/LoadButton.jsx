import React from 'react';
import { Motion, spring } from 'react-motion';
import styled from 'react-emotion';

const { innerWidth, innerHeight } = window;

const Button = styled.div({
  position: 'absolute',
  backgroundColor: 'crimson',
  transition: 'transform .4s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'cente3r',
  zIndex: 10,
});

const LoadButton = ({
  shrink, show, onClick, onRest,
}) => {
  const styles = {
    ...(shrink
      ? {
        top: 20,
        left: innerWidth - 20 - 50,
        width: 50,
        height: 50,
        borderRadius: 10,
      }
      : {
        top: 0,
        left: 0,
        width: innerWidth,
        height: innerHeight,
        borderRadius: 0,
      }),
    opacity: show ? 1 : 0,
  };
  return (
    <Motion
      defaultStyle={{
        top: 0,
        left: 0,
        width: innerWidth,
        height: innerHeight,
        opacity: 1,
        borderRadius: 0,
      }}
      style={{
        top: spring(styles.top),
        left: spring(styles.left),
        width: spring(styles.width),
        height: spring(styles.height),
        borderRadius: spring(styles.borderRadius),
        opacity: spring(styles.opacity),
      }}
      onRest={onRest}
    >
      {interpolatingStyle => (
        <Button style={interpolatingStyle} onClick={onClick}>
          +
        </Button>
      )}
    </Motion>
  );
};

export default LoadButton;
