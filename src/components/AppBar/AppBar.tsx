import React, { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import { Container, AppBar, Typography } from '@material-ui/core';

import { EmptyProps } from 'utils';
import dishImage from 'images/dish.png';

import useStyles from './styles';

const AppBarComponent: FC<EmptyProps> = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <AppBar
        className={classes.appBar}
        position="static"
        color="inherit"
      >
        <Link to="/">
          <img
            className={classes.image}
            src={dishImage}
            alt="dishIcon"
            height="60"
          />
        </Link>
        <Typography
          className={classes.heading}
          variant="h2"
          align="center"
        >
          What&apos;s the dish today?
        </Typography>
      </AppBar>
    </Container>
  );
};

export default memo(AppBarComponent);
