import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';

import { APP_ACCENT_COLOR } from 'utils/constants';

const BackToListWrapper = styled.div`
  a {
    text-decoration: none;
  }

  h2 {
    display: inline-block;
    color: ${APP_ACCENT_COLOR};
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 1rem 0;
    transition: color 0.15s ease;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }
`;

const BackToListButton: React.FC<{ href: string }> = ({ href }) => (
  <BackToListWrapper>
    <Link to={href}>
      <Typography variant="h2" color="textPrimary">
        &larr;{' '}Back to list
      </Typography>
    </Link>
  </BackToListWrapper>
);

export default BackToListButton;
