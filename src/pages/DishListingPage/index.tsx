import React, { FC, useEffect } from 'react';
import { Container, Grow, Grid, Typography } from '@material-ui/core';

import { Dish } from 'models';
import { EmptyProps } from 'utils';
import { useFetchDishesApi } from 'hooks';
import Progress from 'components/Progress';
import DishList from 'components/DishList';
import DishForm from 'components/DishForm';

interface ListContentProps {
  data: Dish[];
  error: any;
  loading: boolean;
}

const ListContent: FC<ListContentProps> = ({ data, error, loading }) => {
  if (loading) return (
    <Typography
      variant="h5"
      color="textSecondary"
      style={{ marginBottom: '0.5em' }}
    >
      We&apos;re getting the dishes...
    </Typography>
  );

  if (error != null) return (
    <Typography
      variant="h5"
      color="textSecondary"
      style={{ marginBottom: '0.5em' }}
    >
      An error occurred while fetching the dishes
      {error?.message ? ` (${error?.message})` : ''}.
    </Typography>
  );

  return <DishList dishes={data} />;
};

const DishListingPage: FC<EmptyProps> = () => {
  const { data, error, loading, fetchData } = useFetchDishesApi();

  useEffect(() => {
    fetchData({
      include_categories: false,
      order_by: 'title',
      order_direction: 'asc'
    });
  }, []);

  return (
    <Container maxWidth="lg">
      <Progress loading={loading}>
        <Grow in>
          <Container>
            <Grid
              container
              justifyContent="space-between"
              alignItems="stretch"
              spacing={3}
            >
              <Grid item xs={12} sm={7}>
                <ListContent data={data} error={error} loading={loading} />
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
