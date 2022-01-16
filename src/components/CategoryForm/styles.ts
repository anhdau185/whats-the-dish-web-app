import styled from 'styled-components';
import { Paper, Typography } from '@material-ui/core';

export const CustomPaper = styled(Paper)`
  && {
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 0px 2px 12px -1px rgba(0, 0, 0, 0.2),
      0px 1px 3px 0px rgba(0, 0, 0, 0.14),
      0px 1px 5px 0px rgba(0, 0, 0, 0.12);

    .MuiTextField-root {
      margin: 8px 0;
    }
  }
`;

export const StyledForm = styled.form`
  && {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const FormHeading = styled(Typography)`
  && {
    width: 100%;
    margin-bottom: 0.25rem;
  }
`;
