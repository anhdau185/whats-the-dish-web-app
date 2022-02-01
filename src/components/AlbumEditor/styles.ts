import styled from 'styled-components';
import {
  Accordion,
  AccordionDetails,
  AccordionActions,
  TextField,
  IconButton
} from '@material-ui/core';

export const CustomAccordion = styled(Accordion)`
  && {
    width: 100%;
    border-radius: 8px;
    box-shadow:
      0px 2px 12px -1px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14),
      0px 1px 3px 0px rgba(0, 0, 0, 0.12);

    &::before {
      content: none;
    }

    @media (min-width: 768px) {
      width: 80%;
    }
  }
`;

export const CustomAccordionDetails = styled(AccordionDetails)`
  && {
    display: flex;
    flex-direction: column;
    padding-top: 0;
  }
`;

export const CustomAccordionActions = styled(AccordionActions)`
  && {
    display: flex;
    justify-content: flex-start;
    padding-top: 0;
  }
`;

interface CustomTextFieldProps {
  isFirst: boolean;
  isLast: boolean;
}

const getTextFieldStyles = (isFirst: boolean, isLast: boolean): string => {
  if (isFirst) return 'margin-top: 0.5rem;';
  if (isLast) return 'margin-top: 1rem; margin-bottom: 0;';
  return 'margin-top: 1rem;';
};

export const CustomTextField = styled(TextField)<CustomTextFieldProps>`
  && {
    ${({ isFirst, isLast }) => getTextFieldStyles(isFirst, isLast)}

    > div {
      padding: 0 8px;
    }
  }
`;

export const StyledIconButton = styled(IconButton)`
  && {
    margin: 0;
    padding: 8px;
    height: max-content;
  }
`;
