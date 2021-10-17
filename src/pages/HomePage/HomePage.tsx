import React, { FC } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';

import { EmptyProps } from 'utils';
import CategoryList from 'components/CategoryList/CategoryList';
import CategoryForm from 'components/CategoryForm/CategoryForm';

const HomePage: FC<EmptyProps> = () => {
  return (
    <Container maxWidth="lg">
      <Grow in>
        <Container>
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <CategoryList />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CategoryForm />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default HomePage;
