import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { LinearProgress } from '@material-ui/core';
import styled from 'styled-components';

import { EmptyProps } from 'utils';
import { appLoadingSelector } from 'reducers/state';

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

const AppProgress: FC<EmptyProps> = () => {
  const loading = useSelector(appLoadingSelector);

  return (
    <StyledProgress
      style={{ visibility: loading ? 'visible' : 'hidden' }}
    />
  );
};

export default AppProgress;
