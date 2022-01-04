import React, { FC, useEffect } from 'react';
import {
  Container,
  Grid,
  CircularProgress,
  Typography
} from '@material-ui/core';

import { useGetCategoryApi } from 'hooks';
import { RouterIdPageProps } from 'utils';
import CategoryAssignmentList from 'components/DishList';
import DetailImageSlider from 'components/DetailImageSlider';
import EditableCategoryTitle from 'components/EditableCategoryTitle';

const CategoryPage: FC<RouterIdPageProps> = ({ match: { params } }) => {
  const {
    data: category,
    includedData: dishes,
    fetchData: fetchCategory,
    loading: fetchingCategory,
    error
  } = useGetCategoryApi();

  const errorOccurred = error != null;
  const dataIsReady = category != null;

  useEffect(() => {
    fetchCategory(params.id, { include_dishes: true });
  }, []);

  return (
    <Container maxWidth="lg">
      {fetchingCategory && <CircularProgress />}
      {errorOccurred && (
        <Typography variant="h5" color="textSecondary">
          An error occurred while fetching the category ({error?.message}).
        </Typography>
      )}
      {dataIsReady && (
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <DetailImageSlider imageUrls={category.attributes.images} />
          </Grid>
          <Grid item xs={6}>
            <EditableCategoryTitle category={category} />
            <Typography variant="body1" color="textSecondary">
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
        </Grid>
      )}
    </Container>
  );
};

export default CategoryPage;
