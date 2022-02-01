import styled from 'styled-components';
import { IconButton, TextField } from '@material-ui/core';

export const StyledIconButton = styled(IconButton)`
  && {
    padding: 8px;
    height: max-content;
  }
`;

export const StyledTextArea = styled(TextField)`
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
  align-items: flex-start;
  min-height: 42px;
  margin-bottom: 1.25rem;
  width: 100%;

  @media (min-width: 768px) {
    width: 90%;
  }

  @media (min-width: 960px) {
    width: 100%;
  }

  @media (min-width: 1280px) {
    width: 90%;
  }
`;

export const EditModeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`;
