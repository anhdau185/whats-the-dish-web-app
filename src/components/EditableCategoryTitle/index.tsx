import React, { FC, useCallback, useRef, useState } from 'react';
import { Typography } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';

import { Category, RawCategory } from 'models';
import useUpdateCategoryApi from 'hooks/useUpdateCategoryApi';

import { StyledIconButton, StyledTextField, TitleWrapper } from './styles';

const EditableCategoryTitle: FC<{ category: Category }> = ({ category }) => {
  const originalValue = useRef<string>(category.attributes.title);
  const [displayValue, setDisplayValue] = useState<string>(category.attributes.title);
  const [editMode, setEditMode] = useState<boolean>(false);
  const { fetchData: updateCategory } = useUpdateCategoryApi({
    onFailure: () => window.alert('Failed to update category title.')
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
      const dataToSubmit: RawCategory = {
        attributes: {
          title: displayValue,
          name: category.attributes.name,
          images: category.attributes.images,
          description: category.attributes.description
        }
      };
      updateCategory(category.id, dataToSubmit);
      originalValue.current = displayValue; // optimistically update original value on save
    }
    setEditMode(false);
  }, [displayValue, originalValue.current, category]);

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

export default EditableCategoryTitle;
