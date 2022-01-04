import React, { FC, useState } from 'react';
import { Typography, TextField, IconButton } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';
import styled from 'styled-components';

import { Category, RawCategory } from 'models';
import useUpdateCategoryApi from 'hooks/useUpdateCategoryApi';

const TitleWrapper = styled.div`
display: flex;
align-items: center;
min-height: 60px;
margin-bottom: 0.5rem;
`;

const StyledTextField = styled(TextField)`
div {
  font-size: 2.125rem;
}
`;

const StyledIconButton = styled(IconButton)`
padding: 8px;
height: max-content;
`;

const EditableCategoryTitle: FC<{ category: Category }> = ({ category }) => {
  const [newTitle, setNewTitle] = useState<string>(category.attributes.title);
  const [editMode, setEditMode] = useState<boolean>(false);
  const { fetchData: updateCategory } = useUpdateCategoryApi();

  const enterEditMode = () => setEditMode(true);

  const exitEditMode = () => {
    setNewTitle(category.attributes.title);
    setEditMode(false);
  };

  const saveNewTitle = () => {
    const dataToSubmit: RawCategory = {
      attributes: {
        title: newTitle,
        name: category.attributes.name,
        images: category.attributes.images,
        description: category.attributes.description
      }
    };
    updateCategory(category.id, dataToSubmit);
    setEditMode(false);
  };

  return (
    <TitleWrapper>
      {editMode ? (
        <>
          <StyledTextField
            size="medium"
            variant="standard"
            value={newTitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNewTitle(e.target.value);
            }}
            inputRef={(input?: HTMLInputElement) => {
              if (input) input.focus();
            }}
          />
          <div style={{ marginLeft: 0 }}>
            <StyledIconButton onClick={saveNewTitle}>
              <Check />
            </StyledIconButton>
            <StyledIconButton onClick={exitEditMode}>
              <Close />
            </StyledIconButton>
          </div>
        </>
      ) : (
        <>
          <Typography variant="h4" style={{ marginRight: 3 }}>
            {newTitle}
          </Typography>
          <StyledIconButton onClick={enterEditMode}>
            <Edit />
          </StyledIconButton>
        </>
      )}
    </TitleWrapper>
  );
};

export default EditableCategoryTitle;
