import React, { FC, useCallback, useState } from 'react';
import { Typography, TextField } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';
import isEmpty from 'lodash/fp/isEmpty';

import { Category, Dish, RawCategory, RawDish } from 'models';

import {
  EditModeWrapper,
  NormalModeWrapper,
  StyledIconButton
} from './styles';

type SubmittedData = RawCategory | RawDish;

interface EditableDescriptionProps {
  data: Category | Dish;
  updateData:
    (id: string, submittedData: SubmittedData) => void | Promise<void>;
}

const EditableDescription: FC<EditableDescriptionProps> = ({ data, updateData }) => {
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
        description: displayValue,
        name: data.attributes.name,
        title: data.attributes.title,
        images: data.attributes.images
      }
    };
    updateData(data.id, dataToSubmit);
  }, [data, displayValue, originalValue]);

  return editMode ? (
    <EditModeWrapper>
      <TextField
        multiline
        variant="standard"
        value={displayValue}
        onChange={onChange}
        inputRef={(input?: HTMLTextAreaElement) => {
          if (input) input.focus();
        }}
        style={{ width: '75%' }}
      />
      <div style={{ marginTop: 5 }}>
        <StyledIconButton onClick={saveNewValue}>
          <Check />
        </StyledIconButton>
        <StyledIconButton onClick={exitEditMode}>
          <Close />
        </StyledIconButton>
      </div>
    </EditModeWrapper>
  ) : (
    <NormalModeWrapper>
      <Typography
        variant="body1"
        color="textSecondary"
        component="pre"
        style={{ lineHeight: 'normal' }}
      >
        {displayValue || 'No description.'}
      </Typography>
      <StyledIconButton onClick={enterEditMode} style={{ marginLeft: 4 }}>
        <Edit />
      </StyledIconButton>
    </NormalModeWrapper>
  );
};

export default EditableDescription;
