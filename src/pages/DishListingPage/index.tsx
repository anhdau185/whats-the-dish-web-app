import React, { FC, useEffect } from 'react';
import { Container, Grow, Grid, Typography } from '@material-ui/core';

import { EmptyProps } from 'utils';
import { useFetchDishesApi } from 'hooks';
import Progress from 'components/Progress';
import DishList from 'components/DishList';
import DishForm from 'components/DishForm';

const DishListingPage: FC<EmptyProps> = () => {
  const {
    data: dishes,
    error,
    loading: isFetchingDishes,
    fetchData: fetchDishes
  } = useFetchDishesApi();

  const errorOccurred = error != null;

  useEffect(() => {
    fetchDishes({
      include_categories: false,
      order_by: 'title',
      order_direction: 'asc'
    });
  }, []);

  return (
    <Container maxWidth="lg">
      <Progress loading={isFetchingDishes}>
        <Grow in>
          <Container>
            <Grid
              container
              justifyContent="space-between"
              alignItems="stretch"
              spacing={3}
            >
              <Grid item xs={12} sm={7}>
                {errorOccurred ? (
                  <Typography
                    variant="h5"
                    color="textSecondary"
                    style={{ marginBottom: '0.5em' }}
                  >
                    An error occurred while fetching the dishes
                    {error?.message ? ` (${error?.message})` : ''}.
                  </Typography>
                ) : (
                  <DishList
                    dishes={dishes}
                    emptyText={isFetchingDishes ? `We're getting the dishes...` : undefined}
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={4}>
                <DishForm />
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Progress>
    </Container>
  );
};

export default DishListingPage;
