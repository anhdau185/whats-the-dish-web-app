import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Container, Grow, Grid, CircularProgress } from '@material-ui/core';

import { EmptyProps } from 'utils';
import { appLoadingSelector, categoriesSelector } from 'reducers/state';
import CategoryList from 'components/CategoryList';
import CategoryForm from 'components/CategoryForm';

const HomePage: FC<EmptyProps> = () => {
  const appLoading = useSelector(appLoadingSelector);
  const categories = useSelector(categoriesSelector);

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
              {appLoading
                ? <CircularProgress />
                : <CategoryList categories={categories} />}
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
