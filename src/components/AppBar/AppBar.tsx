import React, { FC, memo } from 'react';
import { Container, AppBar, Typography } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/styles';

import { EmptyProps } from 'utilities/interfaces';
import dishImage from 'images/dish.png';

import useStyles from './styles';

const AppBarComponent: FC<EmptyProps> = () => {
  const classes: ClassNameMap<string> = useStyles();

  return (
    <Container maxWidth="lg">
      <AppBar
        className={classes.appBar}
        position="static"
        color="inherit"
      >
        <Typography
          className={classes.heading}
          variant="h2"
          align="center"
        >
          What&apos;s the dish?
        </Typography>
        <img
          className={classes.image}
          src={dishImage}
          alt="dishIcon"
          height="60"
        />
      </AppBar>
    </Container>
  );
};

export default memo(AppBarComponent);
