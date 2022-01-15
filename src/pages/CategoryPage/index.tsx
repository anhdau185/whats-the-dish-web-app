import React, { FC, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { RawCategory } from 'models';
import { RouterIdPageProps } from 'utils';
import { useGetCategoryApi, useUpdateCategoryApi } from 'hooks';
import { MoreMenuItems } from 'components/MoreMenu';
import Progress from 'components/Progress';
import CategoryAssignmentList from 'components/DishList';
import AlbumSlider from 'components/AlbumSlider';
import AlbumEditor from 'components/AlbumEditor';
import EditableTitle from 'components/EditableTitle';
import EditableDescription from 'components/EditableDescription';
import CategoryAssignmentDialog from 'components/CategoryAssignmentDialog';

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;

  button {
    margin-left: 1rem;
  }
`;

const CategoryPage: FC<RouterIdPageProps> = ({ match: { params } }) => {
  const [open, setOpen] = useState<boolean>(false);
  const {
    data: category,
    includedData: assignedDishes,
    fetchData: fetchCategory,
    loading: isFetchingCategory,
    error
  } = useGetCategoryApi();

  const errorOccurred = error != null;
  const dataIsReady = category != null;
  const fetchCategoryWithOptions =
    () => fetchCategory(params.id, { include_dishes: true });

  const { fetchData: updateCategory, loading: isUpdatingCategory } =
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
      <Progress loading={isFetchingCategory || isUpdatingCategory}>
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
            <Grid item xs={12} style={{ margin: '1.5rem 0' }}>
              <FlexWrapper>
                <Typography variant="h5" color="textPrimary">
                  Dishes assigned to this category
                </Typography>
                <Button
                  color="primary"
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setOpen(true)}
                >
                  Assign dishes
                </Button>
                <CategoryAssignmentDialog
                  open={open}
                  closeDialog={() => setOpen(false)}
                  data={category}
                  updateData={updateCategory}
                />
              </FlexWrapper>
              <CategoryAssignmentList
                dishes={assignedDishes}
                emptyText="There isn't any dish yet. Would you like to add one?"
                getItemActions={getItemActions}
              />
            </Grid>
          </Grid>
        )}
      </Progress>
    </Container>
  );
};

export default CategoryPage;
