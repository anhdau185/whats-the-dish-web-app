import React, { FC, useEffect } from 'react';
import { Container, Grow, Grid, Typography } from '@material-ui/core';

import { Category } from 'models';
import { EmptyProps } from 'utils';
import { useFetchCategoriesApi } from 'hooks';
import Progress from 'components/Progress';
import CategoryList from 'components/CategoryList';
import CategoryForm from 'components/CategoryForm';

interface ListContentProps {
  data: Category[];
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
      We&apos;re getting the categories...
    </Typography>
  );

  if (error != null) return (
    <Typography
      variant="h5"
      color="textSecondary"
      style={{ marginBottom: '0.5em' }}
    >
      An error occurred while fetching the categories
      {error?.message ? ` (${error?.message})` : ''}.
    </Typography>
  );

  return <CategoryList categories={data} />;
};

const CategoryListingPage: FC<EmptyProps> = () => {
  const { data, error, loading, fetchData } = useFetchCategoriesApi();

  useEffect(() => {
    fetchData({
      include_dishes: false,
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
                <CategoryForm />
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Progress>
    </Container>
  );
};

export default CategoryListingPage;
