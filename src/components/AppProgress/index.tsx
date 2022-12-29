import React from 'react';
import { LinearProgress } from '@material-ui/core';
import styled from 'styled-components';

import { useAppLoading } from 'common/hooks';

const StyledProgress = styled(LinearProgress)`
  && {
    position: fixed !important;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 9999;
  }
`;

const AppProgress: React.FC = () => {
  const { loading } = useAppLoading();

  return (
    <StyledProgress
      color="primary"
      style={{ visibility: loading ? 'visible' : 'hidden' }}
    />
  );
};

export default AppProgress;
