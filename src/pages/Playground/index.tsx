import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Container } from '@material-ui/core';

import { pingingSelector } from 'appState/selectors';

const Playground: React.FC = () => {
  const isPinging = useSelector(pingingSelector);

  return (
    <Container maxWidth="lg">
      <div>{isPinging ? 'PING' : 'PONG'}</div>
      <Button
        color="primary"
        variant="contained"
      >
        PING
      </Button>
    </Container>
  );
};

export default Playground;
