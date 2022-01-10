import React, { FC, useEffect } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';

import { useGetCategoryApi, useUpdateCategoryApi } from 'hooks';
import { RouterIdPageProps } from 'utils';
import Progress from 'components/Progress';
import CategoryAssignmentList from 'components/DishList';
import AlbumSlider from 'components/AlbumSlider';
import AlbumEditor from 'components/AlbumEditor';
import EditableTitle from 'components/EditableTitle';
import EditableDescription from 'components/EditableDescription';

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

  const { fetchData: updateCategory, loading: updatingCategory } =
    useUpdateCategoryApi({ onSuccess: fetchCategoryWithOptions });

  useEffect(() => {
    fetchCategoryWithOptions();
  }, []);

  return (
    <Container maxWidth="lg">
      <Progress loading={fetchingCategory || updatingCategory}>
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
              <EditableTitle data={category} updateData={updateCategory} />
              <EditableDescription data={category} updateData={updateCategory} />
              <AlbumEditor data={category} updateData={updateCategory} />
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
