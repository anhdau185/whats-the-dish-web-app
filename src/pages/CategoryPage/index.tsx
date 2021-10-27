import React, { FC, ReactNode, useEffect } from 'react';
import {
  CircularProgress,
  Container,
  Grow,
  Grid,
  Typography
} from '@material-ui/core';

import { useGetCategoryApi } from 'hooks';
import CategoryAssignmentList from 'components/DishList';

interface CategoryPageProps {
  match: {
    params: { id: string }
  }
}

const PageWrapper: FC<{ children: ReactNode }> = ({ children }) => (
  <Container maxWidth="lg">
    <Grow in>
      <Container>
        <Grid container spacing={4}>{children}</Grid>
      </Container>
    </Grow>
  </Container>
);

const CategoryPage: FC<CategoryPageProps> = ({ match: { params } }) => {
  const {
    data: category,
    includedData: dishes,
    fetchData: fetchCategory,
    loading: fetchingCategory,
    error
  } = useGetCategoryApi(params.id, { include_dishes: true });

  const errorOccurred = error != null;
  const dataIsReady = category != null;

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <PageWrapper>
      {fetchingCategory && <CircularProgress />}
      {errorOccurred && (
        <Typography variant="h5">
          An error occurred while fetching the category ({error?.message}).
        </Typography>
      )}
      {dataIsReady && (
        <>
          <Grid item xs={12}>
            <Typography variant="h4">
              {category.attributes.title}
            </Typography>
            <Typography variant="body1">
              {category.attributes.description}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CategoryAssignmentList
              noItemActions
              dishes={dishes}
              emptyText="No dishes added to this category yet."
            />
          </Grid>
        </>
      )}
    </PageWrapper>
  );
};

export default CategoryPage;
