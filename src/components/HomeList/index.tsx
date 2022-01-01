import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import isEmpty from 'lodash/fp/isEmpty';

import { HomeItem } from 'models';

import { StyledGrid, StyledListItem } from './styles';

const HomeListItem: FC<{ item: HomeItem }> = ({ item }) => (
  <StyledListItem>
    <Link to={item.url}>
      <Typography variant="h2" color="textPrimary">
        {item.title}{' '}&rarr;
      </Typography>
      {!isEmpty(item.description) && (
        <Typography variant="body2" color="textSecondary">
          {item.description}
        </Typography>
      )}
    </Link>
  </StyledListItem>
);

const HomeList: FC<{ items: HomeItem[] }> = ({ items }) => (
  <StyledGrid>
    {items.map(
      (item, index) => <HomeListItem key={`home-item-${index}`} item={item} />
    )}
  </StyledGrid>
);

export default HomeList;
