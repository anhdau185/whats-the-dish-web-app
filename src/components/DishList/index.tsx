import React, { FC } from 'react';
import { Grid, Typography } from '@material-ui/core';
import styled from 'styled-components';
import isEmpty from 'lodash/fp/isEmpty';
import noop from 'lodash/fp/noop';

import { Dish } from 'models';
import DishItem from 'components/DishItem';

const StyledGrid = styled(Grid)`
  display: flex;
  align-items: flex-start;
`;

interface DishListProps {
  dishes: Dish[];
  emptyText?: string;
  noItemActions?: boolean;
  refetchData?: () => void | Promise<void>;
}

const DishList: FC<DishListProps> = ({
  dishes,
  emptyText,
  noItemActions = false,
  refetchData = noop
}) =>
  isEmpty(dishes) ? (
    <Typography variant="h5" color="textSecondary">
      {emptyText || 'No dishes to show.'}
    </Typography>
  ) : (
    <StyledGrid container spacing={3} alignItems="stretch">
      {dishes.map(dish => (
        <Grid key={`dish-${dish.id}`} item xs={12} sm={6}>
          <DishItem
            dish={dish}
            noActions={noItemActions}
            refetchData={refetchData}
          />
        </Grid>
      ))}
    </StyledGrid>
  );

export default DishList;
