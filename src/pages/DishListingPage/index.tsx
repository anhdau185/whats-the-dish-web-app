import React, { FC, useEffect, useCallback } from 'react';
import { Container, Grow, Grid, Typography } from '@material-ui/core';

import { EmptyProps } from 'utils';
import { useDeleteDishApi, useFetchDishesApi } from 'hooks';
import { MoreMenuItems } from 'components/MoreMenu';
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
  const fetchDishesWithOptions = useCallback(() => {
    fetchDishes({
      include_categories: false,
      order_by: 'title',
      order_direction: 'asc'
    });
  }, []);

  const { fetchData: deleteDish } = useDeleteDishApi({
    onSuccess: fetchDishesWithOptions
  });

  const getItemActions = useCallback(
    (dishId: string): MoreMenuItems => ({
      Delete: () => {
        if (window.confirm('Delete this dish?')) deleteDish(dishId);
      }
    }),
    []
  );

  useEffect(() => {
    fetchDishesWithOptions();
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
              {errorOccurred && (
                <Typography
                  variant="h5"
                  color="textSecondary"
                  style={{ marginBottom: '0.5em' }}
                >
                  An error occurred while fetching the dishes
                  {error?.message ? ` (${error?.message})` : ''}.
                </Typography>
              )}
              <DishList
                dishes={dishes}
                emptyText={isFetchingDishes ? `We're getting the dishes...` : undefined}
                getItemActions={getItemActions}
              />
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
