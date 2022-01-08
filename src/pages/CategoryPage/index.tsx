import React, { FC, useEffect } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';

import { useGetCategoryApi } from 'hooks';
import { RouterIdPageProps } from 'utils';
import Progress from 'components/Progress';
import CategoryAssignmentList from 'components/DishList';
import AlbumSlider from 'components/AlbumSlider';
import EditableCategoryTitle from 'components/EditableCategoryTitle';
import EditableCategoryDescription from 'components/EditableCategoryDescription';
import AlbumEditor from 'components/AlbumEditor';

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
      <Progress loading={fetchingCategory}>
        {errorOccurred && (
          <Typography
            variant="h5"
            color="textSecondary"
            style={{ marginBottom: '0.5em' }}
          >
            An error occurred while fetching the category
            {error?.message ? ` (${error?.message})` : ''}.
          </Typography>
        )}
        {dataIsReady && (
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <AlbumSlider album={category.attributes.images} />
            </Grid>
            <Grid item xs={6}>
              <EditableCategoryTitle category={category} />
              <EditableCategoryDescription category={category} />
              <AlbumEditor data={category} refetch={fetchCategoryWithOptions} />
            </Grid>
            {false && (
              <Grid item xs={12}>
                <CategoryAssignmentList
                  noItemActions
                  dishes={dishes}
                  emptyText="No dishes added to this category yet."
                />
              </Grid>
            )}
          </Grid>
        )}
      </Progress>
    </Container>
  );
};

export default CategoryPage;
