import React, { FC, useCallback, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';

import { useFetchDishesApi } from 'hooks';
import { EmptyProps } from 'utils';
import Progress from 'components/Progress';
import DishList from 'components/DishList';
import DishForm from 'components/DishForm';

const DishListingPage: FC<EmptyProps> = () => {
  const {
    data: dishes,
    loading: fetchingDishes,
    fetchData
  } = useFetchDishesApi();

  const fetchDishes = useCallback(() => {
    fetchData({
      include_categories: false,
      order_by: 'title',
      order_direction: 'asc'
    });
  }, []);

  useEffect(() => {
    fetchDishes();
  }, []);

  return (
    <Container maxWidth="lg">
      <Progress loading={fetchingDishes} />
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
                emptyText="No dishes created yet."
                refetchData={fetchDishes}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DishForm refetchData={fetchDishes} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default DishListingPage;
