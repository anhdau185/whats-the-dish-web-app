import React, { FC, useCallback, useEffect } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import isEmpty from 'lodash/fp/isEmpty';

import { useGetDishApi, useUpdateDishApi } from 'hooks';
import { RouterIdPageProps } from 'utils';
import CategoryList from 'components/CategoryList';
import AlbumSlider from 'components/AlbumSlider';
import AlbumEditor from 'components/AlbumEditor';
import EditableTitle from 'components/EditableTitle';
import EditableDescription from 'components/EditableDescription';
import BackToListButton from 'components/BackToListButton';
import ErrorNotice from 'components/ErrorNotice';

const Places: FC<{ places: string[] }> = ({ places }) => (
  <div style={{ marginBottom: '1rem' }}>
    <Typography variant="body1" color="textSecondary" style={{ marginBottom: '0.25rem' }}>
      Where to find:
    </Typography>
    <ul style={{ margin: 0 }}>
      {places.map((item, index) => (
        <li key={`place-${index}`}>
          <Typography variant="body1" color="textSecondary">{item}</Typography>
        </li>
      ))}
    </ul>
  </div>
);

const DishPage: FC<RouterIdPageProps> = ({ match: { params } }) => {
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
  const fetchDishWithOptions = useCallback (
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
          <Grid item xs={6}>
            <AlbumSlider album={dish.attributes.images} />
          </Grid>
          <Grid item xs={6}>
            <EditableTitle data={dish} updateData={updateDish} />
            <EditableDescription data={dish} updateData={updateDish} />
            {!isEmpty(places) && <Places places={places} />}
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
    </Container>
  );
};

export default DishPage;
