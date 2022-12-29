import React, { useCallback, useEffect } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';

import { useGetDishApi, useUpdateDishApi } from 'hooks';
import { RouterIdPageProps } from 'common/types';
import CategoryList from 'components/CategoryList';
import AlbumSlider from 'components/AlbumSlider';
import AlbumEditor from 'components/AlbumEditor';
import EditableTitle from 'components/EditableTitle';
import EditableDescription from 'components/EditableDescription';
import BackToListButton from 'components/BackToListButton';
import ErrorNotice from 'components/ErrorNotice';
import EditablePlaces from 'components/EditablePlaces';

const DishPage: React.FC<RouterIdPageProps> = ({ match: { params } }) => {
  const {
    data: dish,
    includedData: categories,
    loading: isFetchingDish,
    fetchData: fetchDish,
    error
  } = useGetDishApi();

  const errorOccurred = error != null;
  const dataIsReady = dish != null;
  const places = dish?.attributes.places ?? [];
  const fetchDishWithOptions = useCallback(
    () => fetchDish(params.id, { include_categories: true }),
    []
  );

  const { fetchData: updateDish } =
    useUpdateDishApi({ onSuccess: fetchDishWithOptions });

  useEffect(() => {
    fetchDishWithOptions();
  }, []);

  return (
    <Container maxWidth="lg">
      <BackToListButton href="/dishes" />
      {!dataIsReady && isFetchingDish && (
        <Typography
          variant="h5"
          color="textSecondary"
          style={{ marginBottom: '0.5em' }}
        >
          We&apos;re fetching the dish...
        </Typography>
      )}
      {errorOccurred && (
        <ErrorNotice fetchData={fetchDishWithOptions}>
          An error occurred while fetching the dish
          {error?.message ? ` (${error?.message})` : ''}.
        </ErrorNotice>
      )}
      {dataIsReady && (
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <AlbumSlider album={dish.attributes.images} />
          </Grid>
          <Grid item xs={12} md={6}>
            <EditableTitle data={dish} updateData={updateDish} />
            <EditableDescription data={dish} updateData={updateDish} />
            <EditablePlaces places={places} data={dish} updateData={updateDish} />
            <AlbumEditor data={dish} updateData={updateDish} />
          </Grid>
          <Grid item xs={12} style={{ margin: '1.5rem 0' }}>
            <Typography
              variant="h5"
              color="textPrimary"
              style={{ marginBottom: '1.5rem' }}
            >
              Categories that the dish is assigned to:
            </Typography>
            <CategoryList
              categories={categories}
              emptyText="This dish has not yet been added to any categories."
              itemBreakpoints={{ xs: 12, sm: 6, md: 3 }}
            />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default DishPage;
