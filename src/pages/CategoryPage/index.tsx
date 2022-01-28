import React, { FC, useCallback, useEffect } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';

import { RawCategory } from 'models';
import { RouterIdPageProps } from 'utils';
import { useGetCategoryApi, useUpdateCategoryApi } from 'hooks';
import { MoreMenuItems } from 'components/MoreMenu';
import AlbumSlider from 'components/AlbumSlider';
import AlbumEditor from 'components/AlbumEditor';
import EditableTitle from 'components/EditableTitle';
import EditableDescription from 'components/EditableDescription';
import CategoryAssignment from 'components/CategoryAssignment';
import BackToListButton from 'components/BackToListButton';
import ErrorNotice from 'components/ErrorNotice';

const CategoryPage: FC<RouterIdPageProps> = ({ match: { params } }) => {
  const {
    data: category,
    includedData: assignedDishes,
    loading: isFetchingCategory,
    fetchData: fetchCategory,
    error
  } = useGetCategoryApi();

  const errorOccurred = error != null;
  const dataIsReady = category != null;
  const fetchCategoryWithOptions = useCallback(
    () => fetchCategory(params.id, { include_dishes: true }),
    []
  );

  const { fetchData: updateCategory } =
    useUpdateCategoryApi({ onSuccess: fetchCategoryWithOptions });

  const getItemActions = useCallback(
    (dishId: string): MoreMenuItems => ({
      'Unassign from category': () => {
        if (!dataIsReady || !window.confirm('Unassign this dish?')) return;

        const currentDishIds =
          category.relationships?.dishes.data.map(item => item.id) ?? [];

        const dataToSubmit: RawCategory = {
          attributes: {
            name: category.attributes.name,
            title: category.attributes.title,
            description: category.attributes.description,
            images: category.attributes.images,
            dish_ids: currentDishIds.filter(item => item !== dishId)
          }
        };
        updateCategory(category.id, dataToSubmit);
      }
    }),
    [category]
  );

  useEffect(() => {
    fetchCategoryWithOptions();
  }, []);

  return (
    <Container maxWidth="lg">
      <BackToListButton href="/categories" />
      {!dataIsReady && isFetchingCategory && (
        <Typography
          variant="h5"
          color="textSecondary"
          style={{ marginBottom: '0.5em' }}
        >
          We&apos;re fetching the category...
        </Typography>
      )}
      {errorOccurred && (
        <ErrorNotice fetchData={fetchCategoryWithOptions}>
          An error occurred while fetching the category
          {error?.message ? ` (${error?.message})` : ''}.
        </ErrorNotice>
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
          <Grid item xs={12} style={{ margin: '1.5rem 0' }}>
            <CategoryAssignment
              category={category}
              assignedDishes={assignedDishes}
              updateCategory={updateCategory}
              getItemActions={getItemActions}
            />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default CategoryPage;
