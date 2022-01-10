import React, { FC } from 'react';
import { Grid, Typography } from '@material-ui/core';
import styled from 'styled-components';
import isEmpty from 'lodash/fp/isEmpty';

import { Category } from 'models';
import CategoryItem from 'components/CategoryItem';

const StyledGrid = styled(Grid)`
  display: flex;
  align-items: flex-start;
`;

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
  isEmpty(categories) ? (
    <Typography variant="h5" color="textSecondary">
      {emptyText || 'No categories to show.'}
    </Typography>
  ) : (
    <StyledGrid container spacing={3} alignItems="stretch">
      {categories.map(category => (
        <Grid key={`category-${category.id}`} item xs={12} sm={6}>
          <CategoryItem category={category} noActions={noItemActions} />
        </Grid>
      ))}
    </StyledGrid>
  );

export default CategoryList;
