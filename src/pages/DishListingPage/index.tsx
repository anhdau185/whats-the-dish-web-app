import React, { FC, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';

import { useFetchDishesApi } from 'hooks';
import { EmptyProps } from 'utils';
import Progress from 'components/Progress';
import DishList from 'components/DishList';
import DishForm from 'components/DishForm';

const DishListingPage: FC<EmptyProps> = () => {
  const {
    data: dishes,
    loading: isFetchingDishes,
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
                <DishList
                  dishes={dishes}
                  emptyText={isFetchingDishes ? `We're getting the dishes...` : undefined}
                />
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
