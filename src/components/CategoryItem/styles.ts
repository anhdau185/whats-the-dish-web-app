import styled from 'styled-components';
import { Card, CardActions, Typography } from '@material-ui/core';

export const ImageWrapper = styled.div`
  position:relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 40%);
    z-index: 1;
  }

  img {
    display: block;
    object-fit: cover;
    width: 360px;
    height: 240px;
    z-index: 0;
  }
`;

export const TimeOverlay = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  color: white;
  z-index: 2;
`;

export const MoreButtonOverlay = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  color: white;
  z-index: 2;
`;

export const StyledCard = styled(Card)`
  && {
    position: relative;
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    height: 100%;
    justify-content: space-between;
    box-shadow:
      0px 2px 12px -1px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14),
      0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  }
`;

export const StyledCardActions = styled(CardActions)`
  && {
    display: flex;
    justify-content: space-between;
    padding: 0 12px 8px 12px;
  }
`;

export const CategoryDescription = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
