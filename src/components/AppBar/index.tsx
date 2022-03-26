import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@material-ui/core';

import { AppBarHeading, AppBarIcon, WTDAppBar } from './styles';
import dishImage from 'images/dish.png';

const APP_NAME = `What's The Dish?`;

const WhatsTheDishAppBar: React.FC = () => (
  <Container maxWidth="lg">
    <WTDAppBar position="static" color="inherit">
      <Link to="/">
        <AppBarIcon src={dishImage} alt="dishIcon" />
      </Link>
      <AppBarHeading variant="h3" align="center">
        {APP_NAME}
      </AppBarHeading>
    </WTDAppBar>
  </Container>
);

export default React.memo(WhatsTheDishAppBar);
