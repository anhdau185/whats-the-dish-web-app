import React, { FC, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from '@material-ui/core';

import { Dish } from 'models';
import { getDishImages } from 'utils';
import setCurrentDish from 'actions/setCurrentDish';
// import removeCurrentDish from 'actions/removeCurrentDish';
import MoreMenu, { MoreMenuItems } from 'components/MoreMenu';

import useStyles from './styles';

interface DishItemProps {
  dish: Dish;
  noActions?: boolean;
}

const DEFAULT_IMAGE_URL =
  'https://dl.dropboxusercontent.com/s/0krcni2sgpktto9/no-img.jpg';

const DishItem: FC<DishItemProps> = ({ dish, noActions = false }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const dishImage = useMemo(
    () => getDishImages(dish).dishImage || DEFAULT_IMAGE_URL,
    [dish]
  );

  const menuItems = useMemo<MoreMenuItems>(
    () => ({
      'Edit': () => dispatch(setCurrentDish(dish)),
      'Delete': () => {
        if (confirm('Delete this dish?')) {
          // dispatch(
          //   deleteDish({
          //     id: dish.id,
          //     onCompletion: () => dispatch(removeCurrentDish())
          //   })
          // );
        }
      }
    }),
    [dish]
  );

  return (
    <Card className={classes.card}>
      <img
        src={dishImage}
        title={dish.attributes.title}
        alt={dish.attributes.title}
      />
      {!noActions && (
        <div className={classes.overlay2}>
          <MoreMenu items={menuItems} color="white" />
        </div>
      )}
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {dish.attributes.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {dish.attributes.description}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => history.push(`/dishes/${dish.id}`)}
        >
          View details
        </Button>
      </CardActions>
    </Card>
  );
};

export default DishItem;
