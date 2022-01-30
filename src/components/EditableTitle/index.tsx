import React, { FC, useCallback, useState } from 'react';
import { Typography } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';

import { Category, Dish, RawCategory, RawDish } from 'models';

import {
  StyledIconButton,
  StyledTextField,
  TitleWrapper
} from './styles';

type SubmittedData = RawCategory | RawDish;

interface EditableTitleProps {
  data: Category | Dish;
  updateData:
    (id: string, submittedData: SubmittedData) => void | Promise<void>;
}

const EditableTitle: FC<EditableTitleProps> = ({ data, updateData }) => {
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

    const dataToSubmit: SubmittedData = {
      attributes: {
        title: displayValue,
        name: data.attributes.name,
        images: data.attributes.images,
        description: data.attributes.description
      }
    };
    updateData(data.id, dataToSubmit);
  }, [data, displayValue, originalValue]);

  return (
    <TitleWrapper>
      {editMode ? (
        <>
          <StyledTextField
            size="medium"
            variant="standard"
            value={displayValue}
            onChange={onChange}
            inputRef={(input?: HTMLInputElement) => {
              if (input) input.focus();
            }}
          />
          <div style={{ marginLeft: 0 }}>
            <StyledIconButton onClick={saveNewValue}>
              <Check />
            </StyledIconButton>
            <StyledIconButton onClick={exitEditMode}>
              <Close />
            </StyledIconButton>
          </div>
        </>
      ) : (
        <>
          <Typography variant="h4">{displayValue}</Typography>
          <StyledIconButton onClick={enterEditMode} style={{ marginLeft: 8 }}>
            <Edit />
          </StyledIconButton>
        </>
      )}
    </TitleWrapper>
  );
};

export default EditableTitle;
