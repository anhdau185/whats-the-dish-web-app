import React, { FC } from 'react';
import { Container, Grow, Typography } from '@material-ui/core';

import { EmptyProps } from 'utils';
import { HomeItem } from 'models';
import HomeList from 'components/HomeList';

import { StyledWrapper } from './styles';

const HOME_ITEMS: HomeItem[] = [
  {
    url: '/categories',
    title: 'See all categories',
    description: 'Find your favorite types of food.'
  },
  {
    url: '/dishes',
    title: 'See all dishes',
    description: 'Find your favorite foods or drinks.'
  }
];

const HomePage: FC<EmptyProps> = () => (
  <Container maxWidth="lg">
    <Grow in>
      <StyledWrapper>
        <Typography variant="h3" color="textPrimary">
          Welcome to <span>What&apos;s The Dish</span>!
        </Typography>
        <Typography variant="h6" color="textPrimary">
          What are your dishes today?<br />Get started by choosing what you might want to see:
        </Typography>
        <HomeList items={HOME_ITEMS} />
      </StyledWrapper>
    </Grow>
  </Container>
);

export default HomePage;
