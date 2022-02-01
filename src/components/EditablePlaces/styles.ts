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
  width: 100%;

  @media (min-width: 768px) {
    width: 80%;
  }

  @media (min-width: 960px) {
    width: 90%;
  }

  @media (min-width: 1280px) {
    width: 80%;
  }
`;

export const ViewModeWrapper = styled.div`
  display: flex;
`;
