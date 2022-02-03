import React, { FC, useEffect, useCallback } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import styled from 'styled-components';

import { EmptyProps } from 'utils';
import { useDeleteDishApi, useFetchDishesApi } from 'hooks';
import { ActionMenuItems } from 'components/ActionMenu';
import DishList from 'components/DishList';
import DishForm from 'components/DishForm';
import ErrorNotice from 'components/ErrorNotice';

const ResponsiveFormWrapper = styled.div<{ loading: boolean }>`
  @media (max-width: 1279px) {
    display: ${({ loading }) => loading ? 'none' : 'block'};
  }
`;

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
    <Container maxWidth="lg">
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
