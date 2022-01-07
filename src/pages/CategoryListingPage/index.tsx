import React, { FC } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';

import { EmptyProps } from 'utils';
import { useFetchCategoriesAC } from 'hooks';
import Progress from 'components/Progress';
import CategoryList from 'components/CategoryList';
import CategoryForm from 'components/CategoryForm';

const CategoryListingPage: FC<EmptyProps> = () => {
  const {
    loading: fetchingCategories,
    data: categories
  } = useFetchCategoriesAC();

  return (
    <Container maxWidth="lg">
      <Progress loading={fetchingCategories} />
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
                emptyText="No categories created yet."
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
