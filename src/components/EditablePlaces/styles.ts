import styled from 'styled-components';
import { IconButton, TextField } from '@material-ui/core';

export const StyledTextField = styled(TextField)`
  width: 100%;
`;

export const StyledIconButton = styled(IconButton)`
  && {
    padding: 8px;
    height: max-content;
  }
`;

export const EditModeWrapper = styled.div`
  display: block;
  width: 80%;
`;

export const ViewModeWrapper = styled.div`
  display: flex;
`;
