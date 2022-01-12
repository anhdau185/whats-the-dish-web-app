import React, { FC, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, CardContent, Typography } from '@material-ui/core';
import moment from 'moment';
import isEmpty from 'lodash/fp/isEmpty';

import { Dish } from 'models';
import { getDishImages } from 'utils';
import MoreMenu, { MoreMenuItems } from 'components/MoreMenu';

import { DEFAULT_IMAGE_URL } from './constants';
import {
  ImageWrapper,
  MoreButtonOverlay,
  StyledCard,
  StyledCardActions,
  TimeOverlay
} from './styles';

interface DishItemProps {
  dish: Dish;
  itemActions?: MoreMenuItems;
}

const DishItem: FC<DishItemProps> = ({ dish, itemActions = {} }) => {
  const history = useHistory();
  const [timeHovered, setTimeHovered] = useState<boolean>(false);
  const hasItemActions = !isEmpty(itemActions);

  const dishImage = useMemo(
    () => getDishImages(dish).dishImage || DEFAULT_IMAGE_URL,
    [dish]
  );

  const creationDateTime = useMemo(
    () => moment(dish.attributes.createdAt).format('MMM D, YYYY h:mm a'),
    [dish.attributes.createdAt]
  );

  return (
    <StyledCard>
      <ImageWrapper>
        <img
          src={dishImage}
          title={dish.attributes.title}
          alt={dish.attributes.title}
        />
      </ImageWrapper>
      <TimeOverlay>
        <Typography
          variant="body2"
          style={{ cursor: 'default' }}
          onMouseEnter={() => setTimeHovered(true)}
          onMouseLeave={() => setTimeHovered(false)}
        >
          {timeHovered
            ? creationDateTime
            : moment(dish.attributes.createdAt).fromNow()}
        </Typography>
      </TimeOverlay>
      {hasItemActions && (
        <MoreButtonOverlay>
          <MoreMenu color="white" items={itemActions} />
        </MoreButtonOverlay>
      )}
      <CardContent>
        <Typography variant="h5" gutterBottom style={{ marginBottom: '0.2em' }}>
          {dish.attributes.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {dish.attributes.description}
        </Typography>
      </CardContent>
      <StyledCardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => history.push(`/dishes/${dish.id}`)}
        >
          View details
        </Button>
      </StyledCardActions>
    </StyledCard>
  );
};

export default DishItem;
