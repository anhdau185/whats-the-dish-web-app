import styled from 'styled-components';
import { IconButton, TextField } from '@material-ui/core';

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 60px;
  margin-bottom: 0.25rem;
`;

export const StyledTextField = styled(TextField)`
  div {
    font-size: 2.125rem;
  }
`;

export const StyledIconButton = styled(IconButton)`
  padding: 8px;
  height: max-content;
`;
