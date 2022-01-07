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
import EditableCategoryDescription from 'components/EditableCategoryDescription';
import AlbumEditor from 'components/AlbumEditor/AlbumEditor';

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
  const fetchCategoryWithOptions =
    () => fetchCategory(params.id, { include_dishes: true });

  useEffect(() => {
    fetchCategoryWithOptions();
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
            <EditableCategoryDescription category={category} />
            <AlbumEditor data={category} refetch={fetchCategoryWithOptions} />
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
