import React, { FC, useCallback, useState } from 'react';
import { AccordionSummary, InputAdornment, Typography } from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';
import Photo from '@material-ui/icons/Photo';
import compact from 'lodash/fp/compact';
import isEmpty from 'lodash/fp/isEmpty';
import isEqual from 'lodash/fp/isEqual';
import noop from 'lodash/fp/noop';

import { Category, Dish, RawCategory, RawDish } from 'models';
import useUpdateCategoryApi from 'hooks/useUpdateCategoryApi';

import {
  CustomAccordion,
  CustomAccordionDetails,
  CustomAccordionActions,
  CustomTextField,
  StyledIconButton
} from './styles';

interface AlbumEditorProps {
  data: Category | Dish;
  refetch?: () => void | Promise<void>;
}

type SubmittedData = RawCategory | RawDish;

const MAX_IMAGES_ALLOWED = 5;

const generateDisplayAlbum = (actualAlbum: string[]): string[] =>
  Array<string>(MAX_IMAGES_ALLOWED).fill('').map(
    (emptyValue, index) => actualAlbum[index] || emptyValue
  );

const textFieldInputProps = {
  startAdornment: (
    <InputAdornment position="start">
      <Photo />
    </InputAdornment>
  )
};

const AlbumEditor: FC<AlbumEditorProps> = ({ data, refetch = noop }) => {
  const actualAlbum = data.attributes.images;
  const [expanded, setExpanded] = useState<boolean>(false);
  const [displayAlbum, setDisplayAlbum] = useState<string[]>(
    generateDisplayAlbum(actualAlbum)
  );

  const { fetchData: updateCategory } = useUpdateCategoryApi({
    onSuccess: refetch
  });

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
    const compactedDisplayAlbum = compact(displayAlbum);

    if (isEqual(compactedDisplayAlbum, actualAlbum)) return;

    const dataToSubmit: SubmittedData = {
      attributes: {
        images: compactedDisplayAlbum,
        title: data.attributes.title,
        name: data.attributes.name,
        description: data.attributes.description
      }
    };
    updateCategory(data.id, dataToSubmit);
  }, [displayAlbum, data]);

  const reset = () => {
    setExpanded(false);
    setDisplayAlbum(generateDisplayAlbum(actualAlbum));
  };

  return (
    <CustomAccordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
      <AccordionSummary expandIcon={<ExpandMore />}>
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
            ? (isFirst ? 'Enter your primary image URL' : 'Enter your next image URL')
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
              InputProps={textFieldInputProps}
              value={value}
              onChange={onChange(index)}
            />
          );
        })}
      </CustomAccordionDetails>
      <CustomAccordionActions>
        <StyledIconButton onClick={saveAlbum}>
          <Check />
        </StyledIconButton>
        <StyledIconButton onClick={reset}>
          <Close />
        </StyledIconButton>
      </CustomAccordionActions>
    </CustomAccordion>
  );
};

export default AlbumEditor;
