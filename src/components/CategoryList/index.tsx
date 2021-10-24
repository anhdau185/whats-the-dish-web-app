import React, { FC } from 'react';
import { Grid, Typography } from '@material-ui/core';
import isEmpty from 'lodash/fp/isEmpty';

import { Category } from 'models';
import CategoryItem from 'components/CategoryItem';

import useStyles from './styles';

const CategoryList: FC<{ categories: Category[] }> = ({ categories }) => {
  const classes = useStyles();

  return (
    isEmpty(categories)
      ? (
        <Typography variant="h5" className={classes.emptyCategories}>
          No categories created yet.
        </Typography>
      ) : (
        <Grid
          container
          spacing={3}
          alignItems="stretch"
          className={classes.mainContainer}
        >
          {categories.map(
            category => (
              <Grid key={`category-${category.id}`} item xs={12} sm={6}>
                <CategoryItem category={category} />
              </Grid>
            )
          )}
        </Grid>
      )
  );
};

export default CategoryList;
