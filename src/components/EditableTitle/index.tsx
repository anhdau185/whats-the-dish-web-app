import React, { FC, useCallback, useState } from 'react';
import { Typography } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';
import isEmpty from 'lodash/fp/isEmpty';

import { Category, Dish, PartialRawCategory, PartialRawDish } from 'models';

import {
  StyledIconButton,
  StyledTextField,
  TitleWrapper
} from './styles';

type SubmittedData = PartialRawCategory | PartialRawDish;

interface EditableTitleProps {
  data: Category | Dish;
  updateData: (
    id: string,
    submittedData: SubmittedData
  ) => void | Promise<void>;
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
