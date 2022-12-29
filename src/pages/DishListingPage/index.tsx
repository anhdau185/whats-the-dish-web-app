import React, { useEffect, useCallback } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import { useDeleteDishApi, useFetchDishesApi } from 'common/hooks';
import { ActionMenuItems } from 'components/ActionMenu';
import DishList from 'components/DishList';
import DishForm from 'components/DishForm';
import ErrorNotice from 'components/ErrorNotice';

import { ResponsiveButton, ResponsiveFormWrapper } from './styles';

const DishListingPage: React.FC = () => {
  const {
    fetchData: fetchDishes,
    loading: isFetchingDishes,
    data: dishes,
    error
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
    (dishId: string): ActionMenuItems => ({
      Delete: {
        icon: DeleteIcon,
        handler: () => {
          if (window.confirm('Delete this dish?')) deleteDish(dishId);
        }
      }
    }),
    []
  );

  useEffect(() => {
    fetchDishesWithOptions();
  }, []);

  return (
    <Container maxWidth="lg" style={{ marginBottom: '3rem' }}>
      <Grow in>
        <Container>
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} lg={7}>
              {errorOccurred && (
                <ErrorNotice fetchData={fetchDishesWithOptions}>
                  An error occurred while fetching the dishes
                  {error?.message ? ` (${error?.message})` : ''}.
                </ErrorNotice>
              )}
              <ResponsiveButton
                href="#dish-form"
                variant="text"
                color="primary"
                startIcon={<AddIcon />}
                disabled={isFetchingDishes}
              >
                Create a dish
              </ResponsiveButton>
              <DishList
                dishes={dishes}
                emptyText={isFetchingDishes ? `We're getting the dishes...` : undefined}
                getItemActions={getItemActions}
                itemBreakpoints={{ xs: 12, sm: 6, md: 4, lg: 6 }}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <ResponsiveFormWrapper loading={isFetchingDishes}>
                <DishForm />
              </ResponsiveFormWrapper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default DishListingPage;
