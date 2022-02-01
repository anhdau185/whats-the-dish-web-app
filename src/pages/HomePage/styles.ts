import styled from 'styled-components';

import { APP_ACCENT_COLOR } from 'utils/constants';

export const StyledWrapper = styled.div`
  padding: 5rem 0;
  text-align: center;

  h3 {
    font-size: 2.5rem;
    margin-bottom: 1rem;

    span {
      &:first-child {
        display: block;

        @media (min-width: 768px) {
          display: inline;
        }
      }

      &.app-name {
        color: ${APP_ACCENT_COLOR};
      }
    }

    @media (min-width: 768px) {
      font-size: 3rem;
    }
  }

  h6 {
    font-size: 1.5rem;
    line-height: 1.4;
    margin-bottom: 1.5rem;
  }
`;
