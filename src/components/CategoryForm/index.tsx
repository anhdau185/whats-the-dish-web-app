import React, { FC, useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Paper, TextField, Typography } from '@material-ui/core';

import { EmptyProps, getCategoryImages } from 'utils';
import { RawCategory } from 'models';
import { currentCategorySelector } from 'reducers/state';
import createCategory from 'actions/createCategory';
import updateCategory from 'actions/updateCategory';
import removeCurrentCategory from 'actions/removeCurrentCategory';

import useStyles from './styles';

interface CategoryFormData {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
}

const CategoryForm: FC<EmptyProps> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentCategory = useSelector(currentCategorySelector);
  const anyCategorySelected = currentCategory != null;

  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    title: '',
    description: '',
    imageUrl: ''
  });

  const clearForm = useCallback(() => {
    setFormData({
      name: '',
      title: '',
      description: '',
      imageUrl: ''
    });
  }, []);

  const validateForm = useCallback((): boolean => {
    if (!formData.name) {
      window.alert('Category name should not be empty.');
      return false;
    }

    if (formData.name.length > 50) {
      window.alert('Category name should not be over 50 characters.');
      return false;
    }

    if (formData.title.length > 70) {
      window.alert('Title should be not be over 100 characters.');
      return false;
    }

    if (formData.description.length > 150) {
      window.alert('Description should be not be over 150 characters.');
      return false;
    }

    return true;
  }, [formData]);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (anyCategorySelected) {
      const { categoryAlbum } = getCategoryImages(currentCategory);
      const dataToSubmit: RawCategory = {
        attributes: {
          name: formData.name,
          title: formData.title || formData.name,
          description: formData.description,
          images: [formData.imageUrl, ...categoryAlbum]
        }
      };

      dispatch(
        updateCategory({
          id: currentCategory.id,
          category: dataToSubmit,
          onCompletion: () => dispatch(removeCurrentCategory())
        })
      );
    } else {
      const dataToSubmit: RawCategory = {
        attributes: {
          name: formData.name,
          title: formData.title || formData.name,
          description: formData.description,
          images: formData.imageUrl ? [formData.imageUrl] : []
        }
      };

      dispatch(
        createCategory({
          category: dataToSubmit,
          onCompletion: clearForm
        })
      );
    }
  }, [currentCategory, formData]);

  useEffect(() => {
    if (anyCategorySelected) {
      setFormData({
        name: currentCategory.attributes.name,
        title: currentCategory.attributes.title,
        description: currentCategory.attributes.description || '',
        imageUrl: currentCategory.attributes.images[0] || ''
      });
    } else {
      clearForm();
    }
  }, [currentCategory]);

  useEffect(() => () => {
    dispatch(removeCurrentCategory());
  }, []);

  return (
    <Paper className={`${classes.root} ${classes.paper}`}>
      <form
        autoComplete="off"
        noValidate
        className={classes.form}
        onSubmit={handleSubmit}
      >
        <Typography
          variant="h6"
          className={classes.formHeading}
          align="center"
          style={{ marginBottom: 0 }}
        >
          {anyCategorySelected ? 'Edit a Category' : 'Create a Category'}
        </Typography>
        {anyCategorySelected && (
          <>
            <Typography
              variant="body2"
              align="center"
              style={{ marginBottom: 8, width: '100%' }}
            >
              {'Now editing '}
              <b>{currentCategory.attributes.name}</b>
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              style={{ marginBottom: 16 }}
              onClick={() => dispatch(removeCurrentCategory())}
            >
              Create a new category
            </Button>
          </>
        )}
        <TextField
          fullWidth
          name="name"
          label="*Category name"
          variant="outlined"
          value={formData.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, name: e.target.value });
          }}
        />
        <TextField
          fullWidth
          name="title"
          label="Title / Long name"
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
        <TextField
          fullWidth
          name="imageUrl"
          label="Category image URL"
          variant="outlined"
          value={formData.imageUrl}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, imageUrl: e.target.value });
          }}
          style={{ marginBottom: 16 }}
        />
        <Button
          fullWidth
          type="submit"
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
        >
          {anyCategorySelected ? 'Save' : 'Submit'}
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          size="small"
          onClick={clearForm}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default CategoryForm;
