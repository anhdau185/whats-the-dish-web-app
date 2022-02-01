import styled from 'styled-components';
import { IconButton, TextField } from '@material-ui/core';

export const ViewModeWrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 60px;
  margin-bottom: 0.5rem;
`;

export const EditModeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 60px;
  margin-bottom: 0.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const EditModeButtons = styled.div`
  margin-top: 5px;

  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

export const StyledTextField = styled(TextField)`
  > div {
    font-size: 2.125rem;
  }
`;

export const StyledIconButton = styled(IconButton)`
  && {
    padding: 8px;
    height: max-content;
  }
`;
