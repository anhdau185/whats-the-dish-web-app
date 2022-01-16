import { AppBar, Typography } from '@material-ui/core';
import styled from 'styled-components';

export const WTDAppBar = styled(AppBar)`
  && {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    padding: 4px;
    margin: 30px 0;
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
    color: rgb(126, 197, 254);
    font-weight: 300;
  }
`;
