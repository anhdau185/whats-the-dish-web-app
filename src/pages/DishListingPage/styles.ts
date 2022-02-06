import styled from 'styled-components';
import { Button } from '@material-ui/core';

export const ResponsiveFormWrapper = styled.div<{ loading: boolean }>`
  @media (max-width: 1279px) {
    display: ${({ loading }) => loading ? 'none' : 'block'};
  }
`;

export const ResponsiveButton = styled(Button)`
  && {
    display: inline-flex;
    margin-bottom: 6px;

    @media (min-width: 1279px) {
      display: none;
    }
  }
`;
