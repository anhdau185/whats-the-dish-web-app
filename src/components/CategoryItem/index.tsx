import React, { FC, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, CardContent, Typography } from '@material-ui/core';
import moment from 'moment';

import { Category } from 'models';
import { getCategoryImages } from 'utils';
import deleteCategory from 'actions/deleteCategory';
import setCurrentCategory from 'actions/setCurrentCategory';
import removeCurrentCategory from 'actions/removeCurrentCategory';
import MoreMenu, { MoreMenuItems } from 'components/MoreMenu';

import {
  ImageWrapper,
  TimeOverlay,
  MoreButtonOverlay,
  StyledCard,
  StyledCardActions
} from './styles';

const DEFAULT_IMAGE_URL =
  'https://dl.dropboxusercontent.com/s/m6acpdmoket5486/food-placeholder.png';

interface CategoryItemProps {
  category: Category;
  noActions?: boolean;
}

const CategoryItem: FC<CategoryItemProps> = ({ category, noActions = false }) => {
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
    <StyledCard>
      <ImageWrapper>
        <img
          src={categoryImage}
          title={category.attributes.title}
          alt={category.attributes.title}
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
            : moment(category.attributes.createdAt).fromNow()}
        </Typography>
      </TimeOverlay>
      {!noActions && (
        <MoreButtonOverlay>
          <MoreMenu items={menuItems} color="white" />
        </MoreButtonOverlay>
      )}
      <CardContent>
        <Typography variant="h5" gutterBottom style={{ marginBottom: '0.2em' }}>
          {category.attributes.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {category.attributes.description}
        </Typography>
      </CardContent>
      <StyledCardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => history.push(`/categories/${category.id}`)}
        >
          View details
        </Button>
      </StyledCardActions>
    </StyledCard>
  );
};

export default CategoryItem;
