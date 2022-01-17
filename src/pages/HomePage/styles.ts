import styled from 'styled-components';

import { APP_ACCENT_COLOR } from 'utils/constants';

export const StyledWrapper = styled.div`
  padding: 5rem 0;
  text-align: center;

  h3 {
    margin-bottom: 1rem;

    span {
      color: ${APP_ACCENT_COLOR};
    }
  }

  h6 {
    font-size: 1.5rem;
    line-height: 1.4;
    margin-bottom: 1.5rem;
  }
`;
