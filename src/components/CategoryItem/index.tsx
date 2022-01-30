import React, { FC, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, CardContent, Typography } from '@material-ui/core';
import moment from 'moment';

import { Category } from 'models';
import { getCategoryImages } from 'utils';
import { DEFAULT_IMAGE_URL } from 'utils/constants';
import MoreMenu, { MoreMenuItems } from 'components/MoreMenu';

import {
  ImageWrapper,
  TimeOverlay,
  MoreButtonOverlay,
  StyledCard,
  StyledCardActions
} from './styles';

interface CategoryItemProps {
  category: Category;
  itemActions?: MoreMenuItems;
}

const CategoryItem: FC<CategoryItemProps> = ({ category, itemActions }) => {
  const history = useHistory();
  const [timeHovered, setTimeHovered] = useState<boolean>(false);
  const hasItemActions = itemActions != null;

  const categoryImage = useMemo(
    () => getCategoryImages(category).categoryImage ?? DEFAULT_IMAGE_URL,
    [category]
  );

  const creationDateTime = useMemo(
    () => moment(category.attributes.createdAt).format('MMM D, YYYY h:mm a'),
    [category.attributes.createdAt]
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
      {hasItemActions && (
        <MoreButtonOverlay>
          <MoreMenu color="white" items={itemActions} />
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
