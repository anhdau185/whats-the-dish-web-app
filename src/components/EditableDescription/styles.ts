import styled from 'styled-components';
import { IconButton } from '@material-ui/core';

export const StyledIconButton = styled(IconButton)`
  && {
    padding: 8px;
    height: max-content;
  }
`;

export const NormalModeWrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 42px;
  margin-bottom: 1.25rem;
`;

export const EditModeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.25rem;
`;
