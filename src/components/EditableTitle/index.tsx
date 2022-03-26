import React, { useCallback, useState } from 'react';
import { Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import isEmpty from 'lodash/fp/isEmpty';

import { Category, Dish, PartialRawCategory, PartialRawDish } from 'models';

import {
  StyledIconButton,
  StyledTextField,
  EditModeWrapper,
  ViewModeWrapper,
  EditModeButtons
} from './styles';

type SubmittedData = PartialRawCategory | PartialRawDish;

interface EditableTitleProps {
  data: Category | Dish;
  updateData: (
    id: string,
    submittedData: SubmittedData
  ) => void | Promise<void>;
}

const EditableTitle: React.FC<EditableTitleProps> = ({ data, updateData }) => {
  const originalValue = data.attributes.title;
  const [displayValue, setDisplayValue] = useState<string>(originalValue);
  const [editMode, setEditMode] = useState<boolean>(false);

  const enterEditMode = () => setEditMode(true);

  const exitEditMode = () => {
    setEditMode(false);
    setDisplayValue(originalValue);
  };

  const onChange =
    (e: React.ChangeEvent<HTMLInputElement>) => setDisplayValue(e.target.value);

  const saveNewValue = useCallback(() => {
    setEditMode(false);

    if (displayValue === originalValue) return;
    if (isEmpty(displayValue)) {
      window.alert('Title must not be empty.');
      setDisplayValue(originalValue);
      return;
    }

    const dataToSubmit: SubmittedData = {
      attributes: {
        title: displayValue
      }
    };
    updateData(data.id, dataToSubmit);
  }, [data.id, displayValue, originalValue]);

  return editMode ? (
    <EditModeWrapper>
      <StyledTextField
        size="medium"
        variant="standard"
        value={displayValue}
        onChange={onChange}
        inputRef={(input?: HTMLInputElement) => {
          if (input) input.focus();
        }}
      />
      <EditModeButtons>
        <StyledIconButton onClick={saveNewValue}>
          <CheckIcon />
        </StyledIconButton>
        <StyledIconButton onClick={exitEditMode}>
          <CloseIcon />
        </StyledIconButton>
      </EditModeButtons>
    </EditModeWrapper>
  ) : (
    <ViewModeWrapper>
      <Typography variant="h4">{displayValue}</Typography>
      <StyledIconButton onClick={enterEditMode} style={{ marginLeft: 8 }}>
        <EditIcon />
      </StyledIconButton>
    </ViewModeWrapper>
  );
};

export default EditableTitle;
