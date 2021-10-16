import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress, Grid } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/styles';

import { CategoryModel } from 'models';
import { EmptyProps } from 'utilities/interfaces';
import { GlobalState } from 'reducers';
import Category from 'components/Category/Category';

import useStyles from './styles';

const Categories: FC<EmptyProps> = () => {
  const classes: ClassNameMap<string> = useStyles();
  const categories: CategoryModel[] = useSelector(
    (state: Readonly<GlobalState>) => state.categories
  );

  return (
    !categories.length
      ? <CircularProgress />
      : (
        <Grid
          className={classes.mainContainer}
          container
          alignItems="stretch"
          spacing={3}
        >
          {categories.map((category: CategoryModel) => (
            <Grid key={category._id} item xs={12} sm={6}>
              <Category category={category} />
            </Grid>
          ))}
        </Grid>
      )
  );
};

export default Categories;
