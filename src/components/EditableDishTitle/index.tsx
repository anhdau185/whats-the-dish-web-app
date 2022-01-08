import React, { FC, useCallback, useRef, useState } from 'react';
import { Typography } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';

import { Dish, RawDish } from 'models';
import useUpdateDishApi from 'hooks/useUpdateDishApi';

import { StyledIconButton, StyledTextField, TitleWrapper } from './styles';

const EditableDishTitle: FC<{ dish: Dish }> = ({ dish }) => {
  const originalValue = useRef<string>(dish.attributes.title);
  const [displayValue, setDisplayValue] = useState<string>(dish.attributes.title);
  const [editMode, setEditMode] = useState<boolean>(false);
  const { fetchData: updateDish } = useUpdateDishApi({
    onFailure: () => window.alert('Failed to update dish title.')
  });

  const enterEditMode = () => setEditMode(true);

  const exitEditMode = () => {
    setDisplayValue(originalValue.current); // roll back to current original value
    setEditMode(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayValue(e.target.value);
  };

  const saveNewValue = useCallback(() => {
    if (displayValue !== originalValue.current) {
      const dataToSubmit: RawDish = {
        attributes: {
          title: displayValue,
          name: dish.attributes.name,
          images: dish.attributes.images,
          description: dish.attributes.description,
          places: dish.attributes.places
        }
      };
      updateDish(dish.id, dataToSubmit);
      originalValue.current = displayValue; // optimistically update original value on save
    }
    setEditMode(false);
  }, [displayValue, originalValue.current, dish]);

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
          <StyledIconButton onClick={enterEditMode} style={{ marginLeft: 3 }}>
            <Edit />
          </StyledIconButton>
        </>
      )}
    </TitleWrapper>
  );
};

export default EditableDishTitle;
