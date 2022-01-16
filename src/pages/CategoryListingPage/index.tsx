import React, { FC, useEffect } from 'react';
import { Container, Grow, Grid, Typography } from '@material-ui/core';

import { EmptyProps } from 'utils';
import { useFetchCategoriesApi } from 'hooks';
import CategoryList from 'components/CategoryList';
import CategoryForm from 'components/CategoryForm';

const CategoryListingPage: FC<EmptyProps> = () => {
  const {
    data: categories,
    error,
    loading: isFetchingCategories,
    fetchData: fetchCategories
  } = useFetchCategoriesApi();

  const errorOccurred = error != null;

  useEffect(() => {
    fetchCategories({
      include_dishes: false,
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
              {errorOccurred && (
                <Typography
                  variant="h5"
                  color="textSecondary"
                  style={{ marginBottom: '0.5em' }}
                >
                  An error occurred while fetching the categories
                  {error?.message ? ` (${error?.message})` : ''}.
                </Typography>
              )}
              <CategoryList
                categories={categories}
                emptyText={isFetchingCategories ? `We're getting the categories...` : undefined}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CategoryForm />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default CategoryListingPage;
