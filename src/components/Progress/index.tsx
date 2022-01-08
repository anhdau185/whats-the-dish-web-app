import React, { FC } from 'react';
import { LinearProgress } from '@material-ui/core';
import styled from 'styled-components';

interface ProgressProps { 
  loading: boolean;
}

const StyledProgress = styled(LinearProgress)<ProgressProps>`
  visibility: ${({ loading }) => loading ? 'visible' : 'hidden'};
  width: 100%;
  margin-bottom: 1rem;
`;

const Progress: FC<ProgressProps> = ({ loading, children }) => (
  <>
    <StyledProgress loading={loading} />
    {children}
  </>
);

export default Progress;
