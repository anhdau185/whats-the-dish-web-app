import React, { FC } from 'react';
import { CircularProgress, Grid } from '@material-ui/core';
import isEmpty from 'lodash/fp/isEmpty';

import { Dish } from 'models';
import DishItem from 'components/DishItem';

import useStyles from './styles';

const DishList: FC<{ dishes: Dish[] }> = ({ dishes }) => {
  const classes = useStyles();

  return (
    isEmpty(dishes)
      ? <CircularProgress />
      : (
        <Grid
          container
          spacing={3}
          alignItems="stretch"
          className={classes.mainContainer}
        >
          {dishes.map(
            dish => (
              <Grid key={`dish-${dish.id}`} item xs={12} sm={6}>
                <DishItem dish={dish} />
              </Grid>
            )
          )}
        </Grid>
      )
  );
};

export default DishList;
