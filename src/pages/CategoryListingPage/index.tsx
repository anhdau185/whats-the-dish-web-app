import React, { FC, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';

import { EmptyProps } from 'utils';
import { useFetchCategoriesApi } from 'hooks';
import Progress from 'components/Progress';
import CategoryList from 'components/CategoryList';
import CategoryForm from 'components/CategoryForm';

const CategoryListingPage: FC<EmptyProps> = () => {
  const {
    data: categories,
    loading: isFetchingCategories,
    fetchData: fetchCategories
  } = useFetchCategoriesApi();

  useEffect(() => {
    fetchCategories({
      include_dishes: false,
      order_by: 'title',
      order_direction: 'asc'
    });
  }, []);

  return (
    <Container maxWidth="lg">
      <Progress loading={isFetchingCategories}>
        <Grow in>
          <Container>
            <Grid
              container
              justifyContent="space-between"
              alignItems="stretch"
              spacing={3}
            >
              <Grid item xs={12} sm={7}>
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
      </Progress>
    </Container>
  );
};

export default CategoryListingPage;
