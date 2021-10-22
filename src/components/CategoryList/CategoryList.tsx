import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress, Grid } from '@material-ui/core';

import { EmptyProps } from 'utils';
import { categoriesSelector } from 'reducers/state';
import CategoryItem from 'components/CategoryItem/CategoryItem';

import useStyles from './styles';

const CategoryList: FC<EmptyProps> = () => {
  const classes = useStyles();
  const categories = useSelector(categoriesSelector);

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
                <CategoryItem category={category} />
              </Grid>
            )
          )}
        </Grid>
      )
  );
};

export default CategoryList;
