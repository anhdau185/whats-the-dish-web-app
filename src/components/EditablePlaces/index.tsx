import React, { FC, useState } from 'react';
import {
  IconButton,
  InputAdornment,
  Snackbar,
  Typography
} from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';
import HelpOutline from '@material-ui/icons/HelpOutline';
import isEmpty from 'lodash/fp/isEmpty';

import { Dish, RawDish } from 'models';

import {
  StyledTextField,
  StyledIconButton,
  EditModeWrapper,
  ViewModeWrapper
} from './styles';

interface EditablePlacesProps {
  places: string[];
  data: Dish;
  updateData:
    (id: string, submittedData: RawDish) => void | Promise<void>;
}

const EditablePlaces: FC<EditablePlacesProps> = ({ places, data, updateData }) => {
  const originalValue = places.join(', ');
  const [displayValue, setDisplayValue] = useState<string>(originalValue);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [showHelpText, setShowHelpText] = useState<boolean>(false);

  const enterEditMode = () => setEditMode(true);

  const exitEditMode = () => {
    setEditMode(false);
    setDisplayValue(originalValue);
  };

  const onChange =
    (e: React.ChangeEvent<HTMLInputElement>) => setDisplayValue(e.target.value);

  const saveNewValue = () => {
    setEditMode(false);

    if (displayValue === originalValue) return;
    if (isEmpty(displayValue) && !window.confirm('Remove all existing places?')) {
      setDisplayValue(originalValue);
      return;
    }

    const dataToSubmit: RawDish = {
      attributes: {
        name: data.attributes.name,
        title: data.attributes.title,
        description: data.attributes.description,
        images: data.attributes.images,
        places: !isEmpty(displayValue)
          ? displayValue
            .split(',')
            .map(item => item.trim())
            .filter(item => !isEmpty(item))
          : []
      }
    };
    updateData(data.id, dataToSubmit);
  };

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <Typography variant="body1" color="textSecondary" style={{ marginBottom: 4 }}>
        Where to find:
      </Typography>
      {editMode ? (
        <EditModeWrapper>
          <StyledTextField
            size="medium"
            variant="standard"
            value={displayValue}
            onChange={onChange}
            inputRef={(input?: HTMLInputElement) => {
              if (input) input.focus();
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    style={{ padding: 2 }}
                    onClick={() => setShowHelpText(true)}
                  >
                    <HelpOutline />
                  </IconButton>
                  <Snackbar
                    open={showHelpText}
                    message="Enter your places separated by commas"
                    action={
                      <StyledIconButton onClick={() => setShowHelpText(false)}>
                        <Close style={{ color: '#fff' }} />
                      </StyledIconButton>
                    }
                  />
                </InputAdornment>
              )
            }}
          />
          <div style={{ marginTop: 4 }}>
            <StyledIconButton onClick={saveNewValue}>
              <Check />
            </StyledIconButton>
            <StyledIconButton onClick={exitEditMode}>
              <Close />
            </StyledIconButton>
          </div>
        </EditModeWrapper>
      ) : (
        <ViewModeWrapper>
          {!isEmpty(places) ? (
            <ul style={{ margin: 0 }}>
              {places.map((item, index) => (
                <li key={`place-${index}`}>
                  <Typography variant="body1" color="textSecondary">{item}</Typography>
                </li>
              ))}
            </ul>
          ) : (
            <Typography
              variant="body1"
              color="textSecondary"
              style={{ padding: '0.5rem 0.75rem' }}
            >
              No places added yet. Let&apos;s add a few!
            </Typography>
          )}
          <StyledIconButton onClick={enterEditMode} style={{ marginLeft: 8 }}>
            <Edit />
          </StyledIconButton>
        </ViewModeWrapper>
      )}
    </div>
  );
};

export default EditablePlaces;
