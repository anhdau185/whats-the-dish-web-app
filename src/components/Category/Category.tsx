import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@material-ui/core';
import { ClassNameMap } from '@material-ui/styles';
import moment from 'moment';

import { CategoryModel } from 'models';
import deleteCategory from 'actions/deleteCategory';
import setCurrentCategory from 'actions/setCurrentCategory';
import removeCurrentCategory from 'actions/removeCurrentCategory';
import MoreMenu, { MoreMenuItems } from 'components/MoreMenu/MoreMenu';

import useStyles from './styles';

interface CategoryProps {
  category: CategoryModel;
}

const Category: FC<CategoryProps> = (props: CategoryProps) => {
  const { category } = props;
  const [createdAtHovered, setCreatedAtHovered] = useState<boolean>(false);
  const dispatch = useDispatch();
  const classes: ClassNameMap<string> = useStyles();

  const creationDateTime: string =
    moment(category.createdAt).format('MMM D, YYYY h:mm a');

  const menuItems: MoreMenuItems = {
    'Edit': () => dispatch(setCurrentCategory(category)),
    'Delete': () => {
      if (confirm('Delete this category?')) {
        dispatch(
          deleteCategory(
            () => dispatch(removeCurrentCategory()),
            category.name
          )
        );
      }
    }
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={category.images[0]}
        title={category.title}
      />
      <div className={classes.overlay}>
        <Typography
          variant="body2"
          style={{ cursor: 'default' }}
          onMouseEnter={() => setCreatedAtHovered(true)}
          onMouseLeave={() => setCreatedAtHovered(false)}
        >
          {!createdAtHovered
            ? moment(category.createdAt).fromNow()
            : creationDateTime
          }
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <MoreMenu items={menuItems} color="white" />
      </div>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {category.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {category.description}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary">View details</Button>
      </CardActions>
    </Card>
  );
};

export default Category;
