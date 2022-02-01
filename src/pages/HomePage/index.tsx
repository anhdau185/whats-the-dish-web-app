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
    description: 'Find out your favorite types of food'
  },
  {
    url: '/dishes',
    title: 'See all dishes',
    description: 'Find out your favorite food & drink'
  }
];

const HomePage: FC<EmptyProps> = () => (
  <Container maxWidth="lg">
    <Grow in>
      <StyledWrapper>
        <Typography variant="h3" color="textPrimary">
          <span>Welcome to </span>
          <span className="app-name">What&apos;s The Dish</span>
          <span>!</span>
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
