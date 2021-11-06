import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grow, Grid } from '@material-ui/core';

import { EmptyProps } from 'utils';

const HomePage: FC<EmptyProps> = () => {
  return (
    <Container maxWidth="lg">
      <Grow in>
        <Container>
          <Grid container spacing={4}>
            <Link to="/categories">See all categories</Link>
            <Link to="/dishes">See all dishes</Link>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default HomePage;
