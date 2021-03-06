import React, { useCallback, useState } from 'react';
import { Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import isEmpty from 'lodash/fp/isEmpty';

import { Category, Dish, PartialRawCategory, PartialRawDish } from 'models';

import {
  EditModeWrapper,
  ViewModeWrapper,
  StyledIconButton,
  StyledTextArea
} from './styles';

type SubmittedData = PartialRawCategory | PartialRawDish;

interface EditableDescriptionProps {
  data: Category | Dish;
  updateData: (
    id: string,
    submittedData: SubmittedData
  ) => void | Promise<void>;
}

const EditableDescription: React.FC<EditableDescriptionProps> = ({
  data,
  updateData
}) => {
  const originalValue = data.attributes.description ?? '';
  const [displayValue, setDisplayValue] = useState<string>(originalValue);
  const [editMode, setEditMode] = useState<boolean>(false);

  const enterEditMode = () => setEditMode(true);

  const exitEditMode = () => {
    setEditMode(false);
    setDisplayValue(originalValue);
  };

  const onChange =
    (e: React.ChangeEvent<HTMLTextAreaElement>) => setDisplayValue(e.target.value);

  const saveNewValue = useCallback(() => {
    setEditMode(false);

    if (displayValue === originalValue) return;
    if (isEmpty(displayValue) && !window.confirm('Empty out description?')) {
      setDisplayValue(originalValue);
      return;
    }

    const dataToSubmit: SubmittedData = {
      attributes: {
        description: displayValue
      }
    };
    updateData(data.id, dataToSubmit);
  }, [data.id, displayValue, originalValue]);

  return editMode ? (
    <EditModeWrapper>
      <StyledTextArea
        multiline
        variant="standard"
        value={displayValue}
        onChange={onChange}
        inputRef={(input?: HTMLTextAreaElement) => {
          if (input) input.focus();
        }}
      />
      <div style={{ marginTop: 5 }}>
        <StyledIconButton onClick={saveNewValue}>
          <CheckIcon />
        </StyledIconButton>
        <StyledIconButton onClick={exitEditMode}>
          <CloseIcon />
        </StyledIconButton>
      </div>
    </EditModeWrapper>
  ) : (
    <ViewModeWrapper>
      <Typography
        variant="body1"
        color="textSecondary"
        component="pre"
        style={{ lineHeight: 'normal', whiteSpace: 'pre-line' }}
      >
        {displayValue || 'No description.'}
      </Typography>
      <StyledIconButton onClick={enterEditMode} style={{ marginLeft: 4 }}>
        <EditIcon />
      </StyledIconButton>
    </ViewModeWrapper>
  );
};

export default EditableDescription;
