import React, { FC, useEffect } from 'react';
import { Container, Grow, Grid, CircularProgress } from '@material-ui/core';

import { useFetchDishesApi } from 'hooks';
import { EmptyProps } from 'utils';
import DishList from 'components/DishList';
import DishForm from 'components/DishForm';

const DishListingPage: FC<EmptyProps> = () => {
  const {
    data: dishes,
    loading: fetchingDishes,
    fetchData: fetchDishes
  } = useFetchDishesApi();

  useEffect(() => {
    fetchDishes({
      include_categories: false,
      order_by: 'title',
      order_direction: 'asc'
    });
  }, []);

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
              {fetchingDishes
                ? <CircularProgress />
                : (
                  <DishList
                    dishes={dishes}
                    emptyText="No dishes created yet."
                  />
                )}
            </Grid>
            <Grid item xs={12} sm={4}>
              <DishForm />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default DishListingPage;
