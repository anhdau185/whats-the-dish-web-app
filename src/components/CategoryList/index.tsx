import React, { FC } from 'react';
import { Grid, Typography } from '@material-ui/core';
import styled from 'styled-components';
import isEmpty from 'lodash/fp/isEmpty';

import { Category } from 'models';
import { BreakpointSet } from 'utils';
import { MoreMenuItems } from 'components/MoreMenu';
import CategoryItem from 'components/CategoryItem';

const StyledGrid = styled(Grid)`
  display: flex;
  align-items: flex-start;
`;

interface CategoryListProps {
  categories: Category[];
  emptyText?: string;
  getItemActions?: (categoryId: string) => MoreMenuItems;
  itemBreakpoints?: BreakpointSet;
}

const CategoryList: FC<CategoryListProps> = ({
  categories,
  emptyText,
  getItemActions,
  itemBreakpoints
}) => {
  const hasItemActions = getItemActions != null;
  
  return isEmpty(categories) ? (
    <Typography variant="h5" color="textSecondary">
      {emptyText || 'No categories to show.'}
    </Typography>
  ) : (
    <StyledGrid container spacing={3} alignItems="stretch">
      {categories.map(category => (
        <Grid item key={`category-${category.id}`} {...itemBreakpoints}>
          <CategoryItem
            category={category}
            itemActions={hasItemActions ? getItemActions(category.id) : undefined}
          />
        </Grid>
      ))}
    </StyledGrid>
  );
};

export default CategoryList;
