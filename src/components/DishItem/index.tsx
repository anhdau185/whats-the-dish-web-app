import React, { useCallback, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, CardContent, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import moment from 'moment';
import * as api from 'api';

import { Dish } from 'models';
import { getDishImages } from 'utils';
import { DEFAULT_IMAGE_URL } from 'utils/constants';
import ActionMenu, { ActionMenuItems } from 'components/ActionMenu';

import {
  ImageWrapper,
  MoreButtonOverlay,
  StyledCard,
  StyledCardActions,
  TimeOverlay,
  CategoryDescription,
  StyledIconButton
} from './styles';

interface DishItemProps {
  dish: Dish;
  itemActions?: ActionMenuItems;
}

const DishItem: React.FC<DishItemProps> = ({ dish, itemActions = {} }) => {
  const history = useHistory();
  const [timeHovered, setTimeHovered] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(dish.attributes.likeCount > 0);
  const hasItemActions = itemActions != null;

  const dishImage = useMemo(
    () => getDishImages(dish).dishImage ?? DEFAULT_IMAGE_URL,
    [dish]
  );

  const creationDateTime = useMemo(
    () => moment(dish.attributes.createdAt).format('MMM D, YYYY h:mm a'),
    [dish.attributes.createdAt]
  );

  const handleClickLikeButton = useCallback(() => {
    const dishId = dish.id;

    if (liked) {
      api.unlikeDish(dishId);
    } else {
      api.likeDish(dishId);
    }
    setLiked(!liked);
  }, [dish.id, liked]);

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
          <ActionMenu color="white" items={itemActions} />
        </MoreButtonOverlay>
      )}
      <CardContent>
        <Typography variant="h5" gutterBottom style={{ marginBottom: '0.2em' }}>
          {dish.attributes.title}
        </Typography>
        <CategoryDescription variant="body2" color="textSecondary">
          {dish.attributes.description}
        </CategoryDescription>
      </CardContent>
      <StyledCardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => history.push(`/dishes/${dish.id}`)}
        >
          View details
        </Button>
        <StyledIconButton
          color="secondary"
          onClick={handleClickLikeButton}
        >
          {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </StyledIconButton>
      </StyledCardActions>
    </StyledCard>
  );
};

export default DishItem;
