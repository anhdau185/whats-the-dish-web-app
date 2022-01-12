import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { useGetCategoryApi, useUpdateCategoryApi } from 'hooks';
import { RouterIdPageProps } from 'utils';
import Progress from 'components/Progress';
import CategoryAssignmentList from 'components/DishList';
import AlbumSlider from 'components/AlbumSlider';
import AlbumEditor from 'components/AlbumEditor';
import EditableTitle from 'components/EditableTitle';
import EditableDescription from 'components/EditableDescription';

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  button {
    margin-left: 1rem;
  }
`;

const CategoryPage: FC<RouterIdPageProps> = ({ match: { params } }) => {
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
            <Grid item xs={12} style={{ marginTop: '1rem' }}>
              <FlexWrapper>
                <Typography variant="h5" color="textPrimary">
                  Dishes assigned to this category
                </Typography>
                <Button
                  color="primary"
                  variant="contained"
                  startIcon={<AddIcon />}
                >
                  Assign dishes
                </Button>
              </FlexWrapper>
              <CategoryAssignmentList
                noItemActions
                dishes={assignedDishes}
                emptyText="There isn't any dish yet. Would you like to add one?"
              />
            </Grid>
          </Grid>
        )}
      </Progress>
    </Container>
  );
};

export default CategoryPage;
