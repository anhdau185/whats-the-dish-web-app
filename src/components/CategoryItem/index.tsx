import React, { FC, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from '@material-ui/core';

import { Category } from 'models';
import { getCategoryImages } from 'utils';
import deleteCategory from 'actions/deleteCategory';
import setCurrentCategory from 'actions/setCurrentCategory';
import removeCurrentCategory from 'actions/removeCurrentCategory';
import MoreMenu, { MoreMenuItems } from 'components/MoreMenu';

import useStyles from './styles';

const DEFAULT_IMAGE_URL =
  'https://dl.dropboxusercontent.com/s/0krcni2sgpktto9/no-img.jpg';

const CategoryItem: FC<{ category: Category }> = ({ category }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [timeHovered, setTimeHovered] = useState<boolean>(false);

  const categoryImage = useMemo(
    () => getCategoryImages(category).categoryImage || DEFAULT_IMAGE_URL,
    [category]
  );

  const creationDateTime = useMemo(
    () => moment(category.attributes.createdAt).format('MMM D, YYYY h:mm a'),
    [category.attributes.createdAt]
  );

  const menuItems = useMemo<MoreMenuItems>(
    () => ({
      'Edit': () => dispatch(setCurrentCategory(category)),
      'Delete': () => {
        if (confirm('Delete this category?')) {
          dispatch(
            deleteCategory({
              id: category.id,
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
      <img
        src={categoryImage}
        title={category.attributes.title}
        alt={category.attributes.title}
      />
      <div className={classes.overlay}>
        <Typography
          variant="body2"
          style={{ cursor: 'default' }}
          onMouseEnter={() => setTimeHovered(true)}
          onMouseLeave={() => setTimeHovered(false)}
        >
          {timeHovered
            ? creationDateTime
            : moment(category.attributes.createdAt).fromNow()}
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
        <Button
          size="small"
          color="primary"
          onClick={() => history.push(`/categories/${category.id}`)}
        >
          View details
        </Button>
      </CardActions>
    </Card>
  );
};

export default CategoryItem;
