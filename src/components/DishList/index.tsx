import React, { FC } from 'react';
import { Grid, Typography } from '@material-ui/core';
import styled from 'styled-components';
import isEmpty from 'lodash/fp/isEmpty';

import { Dish } from 'models';
import { MoreMenuItems } from 'components/MoreMenu';
import DishItem from 'components/DishItem';

const StyledGrid = styled(Grid)`
  display: flex;
  align-items: flex-start;
`;

interface DishListProps {
  dishes: Dish[];
  emptyText?: string;
  getItemActions?: (dishId: string) => MoreMenuItems
}

const DishList: FC<DishListProps> = ({
  dishes,
  emptyText,
  getItemActions
}) => {
  const hasItemActions = getItemActions != null;

  return (
    isEmpty(dishes) ? (
      <Typography variant="h5" color="textSecondary">
        {emptyText || 'No dishes to show.'}
      </Typography>
    ) : (
      <StyledGrid container spacing={3} alignItems="stretch">
        {dishes.map(dish => (
          <Grid key={`dish-${dish.id}`} item xs={12} sm={6} md={3}>
            <DishItem
              dish={dish}
              itemActions={hasItemActions ? getItemActions(dish.id) : undefined}
            />
          </Grid>
        ))}
      </StyledGrid>
    )
  );
};

export default DishList;
