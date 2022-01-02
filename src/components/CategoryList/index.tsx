import React, { FC } from 'react';
import { Grid, Typography } from '@material-ui/core';
import isEmpty from 'lodash/fp/isEmpty';

import { Category } from 'models';
import CategoryItem from 'components/CategoryItem';

import { StyledGrid } from './styles';

interface CategoryListProps {
  categories: Category[];
  emptyText?: string;
  noItemActions?: boolean;
}

const CategoryList: FC<CategoryListProps> = ({
  categories,
  emptyText,
  noItemActions = false
}) =>
  isEmpty(categories)
    ? (
      <Typography variant="h5" color="textSecondary">
        {emptyText || 'No categories to display.'}
      </Typography>
    ) : (
      <StyledGrid container spacing={3} alignItems="stretch">
        {categories.map(
          category => (
            <Grid key={`category-${category.id}`} item xs={12} sm={6}>
              <CategoryItem category={category} noActions={noItemActions} />
            </Grid>
          )
        )}
      </StyledGrid>
    );

export default CategoryList;
