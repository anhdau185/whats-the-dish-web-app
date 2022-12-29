import { AppBar, Typography } from '@material-ui/core';
import styled from 'styled-components';

import { APP_ACCENT_COLOR } from 'common/constants';

export const WTDAppBar = styled(AppBar)`
  && {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    padding: 4px;
    margin: 20px 0;

    @media (min-width: 768px) {
      margin: 30px 0;
    }
  }
`;

export const AppBarIcon = styled.img`
  && {
    display: block;
    height: 60px;
    margin-right: 15px;
  }
`;

export const AppBarHeading = styled(Typography)`
  && {
    color: ${APP_ACCENT_COLOR};
    font-weight: 300;
    font-size: 2rem;

    @media (min-width: 768px) {
      font-size: 3rem;
    }
  }
`;
