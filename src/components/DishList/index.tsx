import React, { FC } from 'react';
import { Grid, Typography } from '@material-ui/core';
import isEmpty from 'lodash/fp/isEmpty';
import noop from 'lodash/fp/noop';

import { Dish } from 'models';
import DishItem from 'components/DishItem';

import useStyles from './styles';

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
}) => {
  const classes = useStyles();

  return (
    isEmpty(dishes)
      ? (
        <Typography variant="h5" color="textSecondary">
          {emptyText || 'No dishes to display.'}
        </Typography>
      ) : (
        <Grid
          container
          spacing={3}
          alignItems="stretch"
          className={classes.mainContainer}
        >
          {dishes.map(
            dish => (
              <Grid key={`dish-${dish.id}`} item xs={12} sm={6}>
                <DishItem
                  dish={dish}
                  noActions={noItemActions}
                  refetchData={refetchData}
                />
              </Grid>
            )
          )}
        </Grid>
      )
  );
};

export default DishList;
