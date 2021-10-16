import React, { FC, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@material-ui/core';
import moment from 'moment';

import { CategoryModel } from 'models';
import deleteCategory from 'actions/deleteCategory';
import setCurrentCategory from 'actions/setCurrentCategory';
import removeCurrentCategory from 'actions/removeCurrentCategory';
import MoreMenu, { MoreMenuItems } from 'components/MoreMenu/MoreMenu';

import useStyles from './styles';

const Category: FC<{ category: CategoryModel }> = ({ category }) => {
  const [createdAtHovered, setCreatedAtHovered] = useState<boolean>(false);
  const dispatch = useDispatch();
  const classes = useStyles();

  const creationDateTime =
    moment(category.attributes.createdAt).format('MMM D, YYYY h:mm a');

  const menuItems: MoreMenuItems = useMemo(
    () => ({
      'Edit': () => dispatch(setCurrentCategory(category)),
      'Delete': () => {
        if (confirm('Delete this category?')) {
          dispatch(
            deleteCategory({
              name: category.attributes.name,
              onCompletion: () => dispatch(removeCurrentCategory())
            })
          );
        }
      }
    }),
    [category]
  );

  return (
    <Card className={classes.card}>
      <CardMedia
        component='div'
        className={classes.media}
        image={category.attributes.images[0]}
        title={category.attributes.title}
      />
      <div className={classes.overlay}>
        <Typography
          variant="body2"
          style={{ cursor: 'default' }}
          onMouseEnter={() => setCreatedAtHovered(true)}
          onMouseLeave={() => setCreatedAtHovered(false)}
        >
          {!createdAtHovered
            ? moment(category.attributes.createdAt).fromNow()
            : creationDateTime
          }
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <MoreMenu items={menuItems} color="white" />
      </div>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {category.attributes.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {category.attributes.description}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary">View details</Button>
      </CardActions>
    </Card>
  );
};

export default Category;
