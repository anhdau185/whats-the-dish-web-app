import React, { FC, useCallback, useRef, useState } from 'react';
import { Typography, TextField } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';

import { Dish, RawDish } from 'models';
import useUpdateDishApi from 'hooks/useUpdateDishApi';
import { EditModeWrapper, NormalModeWrapper, StyledIconButton } from './styles';

const EditableDishDescription: FC<{ dish: Dish }> = ({ dish }) => {
  const dishDescription = dish.attributes.description || '';
  const originalValue = useRef<string>(dishDescription);
  const [displayValue, setDisplayValue] = useState<string>(dishDescription);
  const [editMode, setEditMode] = useState<boolean>(false);
  const { fetchData: updateDish } = useUpdateDishApi({
    onFailure: () => window.alert('Failed to update dish description.')
  });

  const enterEditMode = () => setEditMode(true);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayValue(e.target.value);
  };

  const exitEditMode = () => {
    setDisplayValue(originalValue.current); // roll back to current original value
    setEditMode(false);
  };

  const saveNewValue = useCallback(() => {
    if (displayValue !== originalValue.current) {
      const dataToSubmit: RawDish = {
        attributes: {
          description: displayValue,
          name: dish.attributes.name,
          title: dish.attributes.title,
          images: dish.attributes.images,
          places: dish.attributes.places
        }
      };
      updateDish(dish.id, dataToSubmit);
      originalValue.current = displayValue; // optimistically update original value on save
    }
    setEditMode(false);
  }, [displayValue, originalValue.current, dish]);

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
      <StyledIconButton onClick={enterEditMode} style={{ marginLeft: 3 }}>
        <Edit />
      </StyledIconButton>
    </NormalModeWrapper>
  );
};

export default EditableDishDescription;
