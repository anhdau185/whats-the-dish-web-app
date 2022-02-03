import React, { FC, useCallback, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import styled from 'styled-components';

import { EmptyProps } from 'utils';
import { useDeleteCategoryApi, useFetchCategoriesApi } from 'hooks';
import { ActionMenuItems } from 'components/ActionMenu';
import CategoryList from 'components/CategoryList';
import CategoryForm from 'components/CategoryForm';
import ErrorNotice from 'components/ErrorNotice';

const ResponsiveFormWrapper = styled.div<{ loading: boolean }>`
  @media (max-width: 1279px) {
    display: ${({ loading }) => loading ? 'none' : 'block'};
  }
`;

const CategoryListingPage: FC<EmptyProps> = () => {
  const {
    data: categories,
    error,
    loading: isFetchingCategories,
    fetchData: fetchCategories
  } = useFetchCategoriesApi();

  const errorOccurred = error != null;
  const fetchCategoriesWithOptions = useCallback(() => {
    fetchCategories({
      include_dishes: false,
      order_by: 'title',
      order_direction: 'asc'
    });
  }, []);

  const { fetchData: deleteCategory } = useDeleteCategoryApi({
    onSuccess: fetchCategoriesWithOptions
  });

  const getItemActions = useCallback(
    (categoryId: string): ActionMenuItems => ({
      Delete: {
        icon: DeleteIcon,
        handler: () => {
          if (window.confirm('Delete this category?')) deleteCategory(categoryId);
        }
      }
    }),
    []
  );

  useEffect(() => {
    fetchCategoriesWithOptions();
  }, []);

  return (
    <Container maxWidth="lg">
      <Grow in>
        <Container>
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} lg={7}>
              {errorOccurred && (
                <ErrorNotice fetchData={fetchCategoriesWithOptions}>
                  An error occurred while fetching the categories
                  {error?.message ? ` (${error?.message})` : ''}.
                </ErrorNotice>
              )}
              <CategoryList
                categories={categories}
                emptyText={isFetchingCategories ? `We're getting the categories...` : undefined}
                getItemActions={getItemActions}
                itemBreakpoints={{ xs: 12, sm: 6, md: 4, lg: 6 }}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <ResponsiveFormWrapper loading={isFetchingCategories}>
                <CategoryForm />
              </ResponsiveFormWrapper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default CategoryListingPage;
