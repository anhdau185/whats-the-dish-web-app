import React, { FC } from 'react';
import { Grid, Typography } from '@material-ui/core';
import isEmpty from 'lodash/fp/isEmpty';

import { Dish } from 'models';
import DishItem from 'components/DishItem';

import useStyles from './styles';

interface DishListProps {
  dishes: Dish[];
  emptyText?: string;
  noItemActions?: boolean;
}

const DishList: FC<DishListProps> = ({
  dishes,
  emptyText,
  noItemActions = false
}) => {
  const classes = useStyles();

  return (
    isEmpty(dishes)
      ? (
        <Typography variant="h5" className={classes.emptyDishes}>
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
                <DishItem dish={dish} noActions={noItemActions} />
              </Grid>
            )
          )}
        </Grid>
      )
  );
};

export default DishList;
