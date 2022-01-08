import React, { FC, useCallback, useRef, useState } from 'react';
import { Typography, TextField } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';

import { Category, RawCategory } from 'models';
import useUpdateCategoryApi from 'hooks/useUpdateCategoryApi';
import { EditModeWrapper, NormalModeWrapper, StyledIconButton } from './styles';

const EditableCategoryDescription: FC<{ category: Category }> = ({ category }) => {
  const categoryDescription = category.attributes.description || '';
  const originalValue = useRef<string>(categoryDescription);
  const [displayValue, setDisplayValue] = useState<string>(categoryDescription);
  const [editMode, setEditMode] = useState<boolean>(false);
  const { fetchData: updateCategory } = useUpdateCategoryApi({
    onFailure: () => window.alert('Failed to update category description.')
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
      const dataToSubmit: RawCategory = {
        attributes: {
          description: displayValue,
          name: category.attributes.name,
          title: category.attributes.title,
          images: category.attributes.images
        }
      };
      updateCategory(category.id, dataToSubmit);
      originalValue.current = displayValue; // optimistically update original value on save
    }
    setEditMode(false);
  }, [displayValue, originalValue.current, category]);

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

export default EditableCategoryDescription;
