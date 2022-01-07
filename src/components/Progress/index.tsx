import { LinearProgress } from '@material-ui/core';
import styled from 'styled-components';

export default styled(LinearProgress)<{ loading: boolean }>`
  visibility: ${({ loading }) => loading ? 'visible' : 'hidden'};
  width: 100%;
  margin-bottom: 1rem;
`;
