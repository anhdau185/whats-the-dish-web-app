import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Paper, TextField, Typography } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/styles';
import FileBase64 from 'react-file-base64';

import { CategoryModel, NullableCategoryModel } from 'models';
import { EmptyProps } from 'utilities/interfaces';
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
  const currentCategory: NullableCategoryModel = useSelector(
    (state: Readonly<GlobalState>) => state.currentCategory
  );
  const dispatch = useDispatch();
  const classes: ClassNameMap<string> = useStyles();

  const clearForm = (): void => {
    setFormData({
      name: '',
      title: '',
      description: '',
      selectedFile: ''
    });
  };

  useEffect((): void => {
    if (currentCategory) {
      setFormData({
        name: currentCategory.name,
        title: currentCategory.title,
        description: currentCategory.description || '',
        selectedFile: currentCategory.images[0]
      });
    } else {
      clearForm();
    }
  }, [currentCategory]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const dataToSubmit: CategoryModel = {
      name: formData.name,
      title: formData.title,
      description: formData.description,
      images: [formData.selectedFile]
    };

    if (currentCategory) {
      dispatch(
        updateCategory(
          () => dispatch(removeCurrentCategory()),
          currentCategory.name,
          dataToSubmit
        )
      );
    } else {
      dispatch(createCategory(clearForm, dataToSubmit));
    }
  };

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
              Now editing <b>{`${currentCategory.name} (${currentCategory.title})`}</b>
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
          name="name"
          label="Category name (must be unique)"
          variant="outlined"
          fullWidth
          disabled={Boolean(currentCategory)}
          value={formData.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, name: e.target.value });
          }}
        />
        <TextField
          name="title"
          label="Category title"
          variant="outlined"
          fullWidth
          value={formData.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, title: e.target.value });
          }}
        />
        <TextField
          name="description"
          label="Description"
          variant="outlined"
          fullWidth
          value={formData.description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, description: e.target.value });
          }}
        />
        <div className={classes.fileInput}>
          <FileBase64
            type="file"
            multiple={false}
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            onDone={(result: any) => {
              if (result && 'base64' in result && typeof result.base64 === 'string') {
                setFormData({
                  ...formData,
                  selectedFile: result.base64
                });
              } else {
                console.error(
                  'Error converting image to base64. Conversion result: ',
                  result
                );
              }
            }}
          />
        </div>
        <Button
          type="submit"
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          fullWidth
          onClick={() => {
            if (currentCategory) {
              setFormData({
                ...formData,
                title: '',
                description: '',
                selectedFile: ''
              });
            } else {
              clearForm();
            }
          }}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default CategoryForm;
