import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress, Grid } from '@material-ui/core';

import { EmptyProps } from 'utils';
import { GlobalState } from 'reducers';
import Category from 'components/Category/Category';

import useStyles from './styles';

const Categories: FC<EmptyProps> = () => {
  const classes = useStyles();
  const categories = useSelector(
    (state: Readonly<GlobalState>) => state.categories
  );

  return (
    categories.length === 0
      ? <CircularProgress />
      : (
        <Grid
          className={classes.mainContainer}
          container
          alignItems="stretch"
          spacing={3}
        >
          {categories.map(
            category => (
              <Grid key={category.id} item xs={12} sm={6}>
                <Category category={category} />
              </Grid>
            )
          )}
        </Grid>
      )
  );
};

export default Categories;
