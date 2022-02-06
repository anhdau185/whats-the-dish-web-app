import styled from 'styled-components';

import { APP_ACCENT_COLOR } from 'utils/constants';

export const StyledWrapper = styled.div`
  padding: 3rem 0;
  text-align: center;

  @media (min-width: 768px) {
    padding: 5rem 0;
  }

  h3 {
    font-size: 2rem;
    margin-bottom: 1rem;

    @media (min-width: 768px) {
      font-size: 3rem;
    }

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
  }

  h6 {
    font-size: 1.25rem;
    line-height: 1.4;
    margin-bottom: 1.5rem;

    @media (min-width: 768px) {
      font-size: 1.5rem;
    }
  }
`;
