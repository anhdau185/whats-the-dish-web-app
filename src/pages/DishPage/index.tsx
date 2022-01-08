import React, { FC, useEffect } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';

import { useGetDishApi, useUpdateDishApi } from 'hooks';
import { RouterIdPageProps } from 'utils';
import Progress from 'components/Progress';
import CategoryList from 'components/CategoryList';
import AlbumSlider from 'components/AlbumSlider';
import AlbumEditor from 'components/AlbumEditor';
import EditableTitle from 'components/EditableTitle';
import EditableDishDescription from 'components/EditableDishDescription';

const DishPage: FC<RouterIdPageProps> = ({ match: { params } }) => {
  const {
    data: dish,
    includedData: categories,
    fetchData: fetchDish,
    loading: fetchingDish,
    error
  } = useGetDishApi();

  const errorOccurred = error != null;
  const dataIsReady = dish != null;
  const fetchDishWithOptions =
    () => fetchDish(params.id, { include_categories: true });

  const { fetchData: updateDish, loading: updatingDish } =
    useUpdateDishApi({ onSuccess: fetchDishWithOptions });

  useEffect(() => {
    fetchDishWithOptions();
  }, []);

  return (
    <Container maxWidth="lg">
      <Progress loading={fetchingDish || updatingDish}>
        {errorOccurred && (
          <Typography
            variant="h5"
            color="textSecondary"
            style={{ marginBottom: '0.5em' }}
          >
            An error occurred while fetching the dish
            {error?.message ? ` (${error?.message})` : ''}.
          </Typography>
        )}
        {dataIsReady && (
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <AlbumSlider album={dish.attributes.images} />
            </Grid>
            <Grid item xs={6}>
              <EditableTitle data={dish} updateData={updateDish} />
              <EditableDishDescription dish={dish} />
              <AlbumEditor data={dish} updateData={updateDish} />
            </Grid>
            {false && (
              <Grid item xs={12}>
                <CategoryList
                  noItemActions
                  categories={categories}
                  emptyText="This dish has not yet been added to any categories."
                />
              </Grid>
            )}
          </Grid>
        )}
      </Progress>
    </Container>
  );
};

export default DishPage;
