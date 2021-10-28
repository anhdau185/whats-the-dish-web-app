import React, { FC, ReactNode, useEffect } from 'react';
import {
  CircularProgress,
  Container,
  Grow,
  Grid,
  Typography
} from '@material-ui/core';

import { useGetDishApi } from 'hooks';
import { RouterIdPageProps } from 'utils';
import CategoryList from 'components/CategoryList';

const PageWrapper: FC<{ children?: ReactNode }> = ({ children }) => (
  <Container maxWidth="lg">
    <Grow in>
      <Container>
        <Grid container spacing={4}>{children}</Grid>
      </Container>
    </Grow>
  </Container>
);

const DishPage: FC<RouterIdPageProps> = ({ match: { params } }) => {
  const {
    data: dish,
    includedData: categories,
    fetchData: fetchDish,
    loading: fetchingDish,
    error
  } = useGetDishApi();

  const errorOccurred = error != null;
  const dataIsReady = dish != null;

  useEffect(() => {
    fetchDish(params.id, { include_categories: true });
  }, []);

  return (
    <PageWrapper>
      {fetchingDish && <CircularProgress />}
      {errorOccurred && (
        <Typography variant="h5">
          An error occurred while fetching the dish ({error?.message}).
        </Typography>
      )}
      {dataIsReady && (
        <>
          <Grid item xs={12}>
            <Typography variant="h4">
              {dish.attributes.title}
            </Typography>
            <Typography variant="body1">
              {dish.attributes.description}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CategoryList
              noItemActions
              categories={categories}
              emptyText="This dish has not yet been added to any categories."
            />
          </Grid>
        </>
      )}
    </PageWrapper>
  );
};

export default DishPage;
