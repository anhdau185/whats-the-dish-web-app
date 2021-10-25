import React, { FC } from 'react';
import {
  CircularProgress,
  Container,
  Grow,
  Grid
} from '@material-ui/core';

import { useGetCategoryApi } from 'hooks';
import DishList from 'components/DishList';
import DishForm from 'components/DishForm';

interface CategoryPageProps {
  match: {
    params: { id: string }
  }
}

const CategoryPage: FC<CategoryPageProps> = ({ match: { params } }) => {
  const {
    data: category,
    includedData: dishes,
    loading: isFetchingCategory,
    error
  } = useGetCategoryApi(params.id, { include_dishes: true });
  const dataIsReady = category != null;
  const errorOccurred = error != null;

  if (isFetchingCategory) return <CircularProgress />;

  if (errorOccurred)
    return (
      <div>
        An error occurred while fetching the category ({error?.message}).
      </div>
    );

  return !dataIsReady
    ? <CircularProgress />
    : (
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
                <DishList dishes={dishes} />
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

export default CategoryPage;
