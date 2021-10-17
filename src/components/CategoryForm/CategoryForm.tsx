import React, { FC, useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Paper, TextField, Typography } from '@material-ui/core';
import FileBase64 from 'react-file-base64';

import { EmptyProps } from 'utils';
import { RawCategory } from 'models';
import { GlobalState } from 'reducers';
import createCategory from 'actions/createCategory';
import updateCategory from 'actions/updateCategory';
import removeCurrentCategory from 'actions/removeCurrentCategory';

import useStyles from './styles';

interface CategoryFormData {
  name: string;
  title: string;
  description: string;
  selectedFile: string;
}

const CategoryForm: FC<EmptyProps> = () => {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    title: '',
    description: '',
    selectedFile: ''
  });
  const currentCategory = useSelector(
    (state: Readonly<GlobalState>) => state.currentCategory
  );
  const isAnyCategorySelected = currentCategory != null;
  const dispatch = useDispatch();
  const classes = useStyles();

  const clearForm = useCallback(() => {
    setFormData({
      name: '',
      title: '',
      description: '',
      selectedFile: ''
    });
  }, []);

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const onProcessingImgDone = useCallback((result: any) => {
    if (result && 'base64' in result
      && typeof result.base64 === 'string') {
      setFormData({
        ...formData,
        selectedFile: result.base64
      });
    } else {
      console.error('Error converting image to base64: ', result);
    }
  }, [formData]);

  const handleClickClear = useCallback(() => {
    if (isAnyCategorySelected) {
      setFormData({
        ...formData,
        title: '',
        description: '',
        selectedFile: ''
      });
    } else {
      clearForm();
    }
  }, [currentCategory, formData]);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataToSubmit: RawCategory = {
      attributes: {
        name: formData.name,
        title: formData.title,
        description: formData.description,
        images: [formData.selectedFile]
      }
    };

    if (isAnyCategorySelected) {
      dispatch(
        updateCategory({
          id: currentCategory.id,
          category: dataToSubmit,
          onCompletion: () => dispatch(removeCurrentCategory())
        })
      );
    } else {
      dispatch(
        createCategory({
          category: dataToSubmit,
          onCompletion: clearForm
        })
      );
    }
  }, [currentCategory, formData]);

  useEffect(() => {
    if (isAnyCategorySelected) {
      setFormData({
        name: currentCategory.attributes.name,
        title: currentCategory.attributes.title,
        description: currentCategory.attributes.description || '',
        selectedFile: currentCategory.attributes.images[0]
      });
    } else {
      clearForm();
    }
  }, [currentCategory]);

  return (
    <Paper className={`${classes.root} ${classes.paper}`}>
      <form
        autoComplete="off"
        noValidate
        className={classes.form}
        onSubmit={handleSubmit}
      >
        <Typography className={classes.formHeading} variant="h6" align="center">
          {currentCategory ? 'Edit' : 'Create'} a Category
        </Typography>
        {currentCategory
          ? <>
            <Typography
              variant="body2"
              align="center"
              style={{ marginBottom: '8px', width: '100%' }}
            >
              Now editing
              <b>{`${currentCategory.attributes.name} (${currentCategory.attributes.title})`}</b>
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              style={{ marginBottom: '5px' }}
              onClick={() => dispatch(removeCurrentCategory())}
            >
              Create a new category
            </Button>
          </>
          : null
        }
        <TextField
          fullWidth
          name="name"
          label="Category name (must be unique)"
          variant="outlined"
          disabled={currentCategory != null}
          value={formData.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, name: e.target.value });
          }}
        />
        <TextField
          fullWidth
          name="title"
          label="Category title"
          variant="outlined"
          value={formData.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, title: e.target.value });
          }}
        />
        <TextField
          fullWidth
          name="description"
          label="Description"
          variant="outlined"
          value={formData.description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, description: e.target.value });
          }}
        />
        <div className={classes.fileInput}>
          <FileBase64
            type="file"
            multiple={false}
            onDone={onProcessingImgDone}
          />
        </div>
        <Button
          fullWidth
          type="submit"
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
        >
          Submit
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          size="small"
          onClick={handleClickClear}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default CategoryForm;
