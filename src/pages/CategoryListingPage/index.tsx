import React, { FC, useCallback, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';

import { EmptyProps } from 'utils';
import { useFetchCategoriesApi } from 'hooks';
import CategoryList from 'components/CategoryList';
import CategoryForm from 'components/CategoryForm';
import ErrorNotice from 'components/ErrorNotice';

const CategoryListingPage: FC<EmptyProps> = () => {
  const {
    data: categories,
    error,
    loading: isFetchingCategories,
    fetchData: fetchCategories
  } = useFetchCategoriesApi();

  const errorOccurred = error != null;
  const fetchCategoriesWithOptions = useCallback(() => {
    fetchCategories({
      include_dishes: false,
      order_by: 'title',
      order_direction: 'asc'
    });
  }, []);

  useEffect(() => {
    fetchCategoriesWithOptions();
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
                <ErrorNotice fetchData={fetchCategoriesWithOptions}>
                  An error occurred while fetching the categories
                  {error?.message ? ` (${error?.message})` : ''}.
                </ErrorNotice>
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
