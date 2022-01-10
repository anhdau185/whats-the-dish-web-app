import React, { FC, useCallback, useState } from 'react';
import { Button, Paper, TextField, Typography } from '@material-ui/core';

import { EmptyProps } from 'utils';
import { RawCategory } from 'models';
import { useCreateCategoryApi, useFetchCategoriesApi } from 'hooks';

import useStyles from './styles';

interface CategoryFormData {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
}

const validateForm = (formData: CategoryFormData): boolean => {
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
};

const CategoryForm: FC<EmptyProps> = () => {
  const classes = useStyles();
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

  const { fetchData: fetchCategories } = useFetchCategoriesApi();
  const { loading: isCreatingCategory, fetchData: createCategory } =
    useCreateCategoryApi({
      onSuccess: () => {
        clearForm();
        fetchCategories({
          include_dishes: false,
          order_by: 'title',
          order_direction: 'asc'
        });
      } 
    });

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm(formData)) return;

    const dataToSubmit: RawCategory = {
      attributes: {
        name: formData.name,
        title: formData.title || formData.name,
        description: formData.description,
        images: formData.imageUrl ? [formData.imageUrl] : []
      }
    };
    createCategory(dataToSubmit);
  }, [formData]);

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
          align="center"
          style={{ width: '100%', marginBottom: 0 }}
        >
          {isCreatingCategory ? 'Creating your category...' : 'Create a category'}
        </Typography>
        <TextField
          fullWidth
          name="name"
          label="*Category name"
          variant="outlined"
          value={formData.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, name: e.target.value });
          }}
          disabled={isCreatingCategory}
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
          disabled={isCreatingCategory}
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
          disabled={isCreatingCategory}
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
          disabled={isCreatingCategory}
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          style={{ marginBottom: 10 }}
          disabled={isCreatingCategory}
        >
          {isCreatingCategory ? 'Submitting...' : 'Submit'}
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          size="small"
          onClick={clearForm}
          disabled={isCreatingCategory}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default CategoryForm;
