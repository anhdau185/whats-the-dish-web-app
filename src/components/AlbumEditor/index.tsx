import React, { FC, useCallback, useState } from 'react';
import {
  AccordionSummary,
  InputAdornment,
  Typography,
  IconButton
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import PhotoIcon from '@material-ui/icons/Photo';
import compact from 'lodash/fp/compact';
import isEmpty from 'lodash/fp/isEmpty';
import isEqual from 'lodash/fp/isEqual';

import {
  Category,
  Dish,
  PartialRawCategory,
  PartialRawDish
} from 'models';

import {
  CustomAccordion,
  CustomAccordionDetails,
  CustomAccordionActions,
  CustomTextField,
  StyledIconButton
} from './styles';

type SubmittedData = PartialRawCategory | PartialRawDish;

interface AlbumEditorProps {
  data: Category | Dish;
  updateData: (
    id: string,
    submittedData: SubmittedData
  ) => void | Promise<void>;
}

const MAX_IMAGES_ALLOWED = 5;

const generateDisplayAlbum = (actualAlbum: string[]): string[] =>
  Array<string>(MAX_IMAGES_ALLOWED).fill('').map(
    (emptyValue, index) => actualAlbum[index] || emptyValue
  );

const AlbumEditor: FC<AlbumEditorProps> = ({ data, updateData }) => {
  const actualAlbum = data.attributes.images;
  const [expanded, setExpanded] = useState<boolean>(false);
  const [displayAlbum, setDisplayAlbum] = useState<string[]>(
    generateDisplayAlbum(actualAlbum)
  );

  const onChange = useCallback(
    (targetIndex: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      const newDisplayAlbum = displayAlbum.map(
        (value, index) => index === targetIndex ? newValue : value
      );
      setDisplayAlbum(newDisplayAlbum);
    },
    [displayAlbum]
  );

  const saveAlbum = useCallback(() => {
    setExpanded(false);
    const compactedDisplayAlbum = compact(displayAlbum);

    if (isEqual(compactedDisplayAlbum, actualAlbum)) return;

    const dataToSubmit: SubmittedData = {
      attributes: {
        images: compactedDisplayAlbum
      }
    };
    updateData(data.id, dataToSubmit);
  }, [displayAlbum, data.id]);

  const reset = useCallback(() => {
    setExpanded(false);
    setDisplayAlbum(generateDisplayAlbum(actualAlbum));
  }, [actualAlbum]);

  return (
    <CustomAccordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Edit album...</Typography>
      </AccordionSummary>
      <CustomAccordionDetails>
        {displayAlbum.map((value, index) => {
          const isFirst = index === 0;
          const isLast = index === displayAlbum.length - 1;
          const prevValue = displayAlbum[index - 1];
          const nextValue = displayAlbum[index + 1];

          const disabled =
            !isEmpty(nextValue) || (!isFirst && isEmpty(value) && isEmpty(prevValue));

          const placeholder = !disabled
            ? (isFirst ? 'Enter your primary image URL' : 'Enter another image URL')
            : undefined;

          return (
            <CustomTextField
              key={`album-img-${index}`}
              isFirst={isFirst}
              isLast={isLast}
              size="small"
              variant="outlined"
              disabled={disabled}
              label={isFirst ? 'Primary image' : undefined}
              placeholder={placeholder}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhotoIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end" style={{ marginLeft: 4 }}>
                    <IconButton
                      style={{ padding: 2 }}
                      disabled={disabled}
                      onClick={() => {
                        const newDisplayAlbum = displayAlbum.map(
                          (val, idx) => idx === index ? '' : val
                        );
                        setDisplayAlbum(newDisplayAlbum);
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              value={value}
              onChange={onChange(index)}
            />
          );
        })}
      </CustomAccordionDetails>
      <CustomAccordionActions>
        <StyledIconButton onClick={saveAlbum}>
          <CheckIcon />
        </StyledIconButton>
        <StyledIconButton onClick={reset}>
          <CloseIcon />
        </StyledIconButton>
      </CustomAccordionActions>
    </CustomAccordion>
  );
};

export default AlbumEditor;
