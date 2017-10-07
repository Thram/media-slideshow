import React from 'react';
import styled from 'react-emotion';

const Image = styled.div(
  {
    width: '100%',
    height: '100%',
    transition: 'background-image .4s ease',
  },
  ({ source }) => ({
    backgroundImage: `url("file://${source}")`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }),
);

const Container = styled.div({
  flex: 1,
  width: '100%',
  height: '100%',
});

export default ({ source, ...props }) => (
  <Container>
    <Image {...props} source={source} />
  </Container>
);
