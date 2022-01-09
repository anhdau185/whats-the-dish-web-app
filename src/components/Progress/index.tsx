import React, { FC } from 'react';
import { LinearProgress } from '@material-ui/core';
import styled from 'styled-components';

const StyledProgress = styled(LinearProgress)`
  width: 100%;
  margin-bottom: 1rem;
`;

const Progress: FC<{ loading: boolean }> = ({ loading, children }) => (
  <>
    <StyledProgress style={{ visibility: loading ? 'visible' : 'hidden' }} />
    {children}
  </>
);

export default Progress;
