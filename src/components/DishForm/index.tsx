import React, { useCallback, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import isEmpty from 'lodash/fp/isEmpty';

import { RawDish } from 'models';
import { useCreateDishApi, useFetchDishesApi } from 'common/hooks';

import { CustomPaper, StyledForm, FormHeading } from './styles';

interface DishFormData {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  places: string;
}
const validateForm = (formData: DishFormData): boolean => {
  if (!formData.name) {
    window.alert('Dish name should not be empty.');
    return false;
  }

  if (formData.name.length > 50) {
    window.alert('Dish name should not be over 50 characters.');
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

const DishForm: React.FC = () => {
  const [formData, setFormData] = useState<DishFormData>({
    name: '',
    title: '',
    description: '',
    imageUrl: '',
    places: ''
  });

  const clearForm = useCallback(() => {
    setFormData({
      name: '',
      title: '',
      description: '',
      imageUrl: '',
      places: ''
    });
  }, []);

  const { fetchData: fetchDishes } = useFetchDishesApi();
  const { fetchData: createDish, loading: isCreatingDish } =
    useCreateDishApi({
      onSuccess: () => {
        clearForm();
        fetchDishes({
          include_categories: false,
          order_by: 'title',
          order_direction: 'asc'
        });
      }
    });

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm(formData)) return;

    const dataToSubmit: RawDish = {
      attributes: {
        name: formData.name,
        title: formData.title || formData.name,
        description: formData.description,
        images: formData.imageUrl ? [formData.imageUrl] : [],
        places: formData.places
          ? formData.places
            .split(',')
            .map(item => item.trim())
            .filter(item => !isEmpty(item))
          : []
      }
    };
    createDish(dataToSubmit);
  }, [formData]);

  return (
    <CustomPaper>
      <StyledForm
        id="dish-form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <FormHeading variant="h6" align="center">
          {isCreatingDish ? 'Creating your dish...' : 'Create a dish'}
        </FormHeading>
        <TextField
          fullWidth
          name="name"
          label="*Dish name"
          variant="outlined"
          value={formData.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, name: e.target.value });
          }}
          disabled={isCreatingDish}
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
          disabled={isCreatingDish}
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
          disabled={isCreatingDish}
        />
        <TextField
          fullWidth
          name="imageUrl"
          label="Dish image URL"
          variant="outlined"
          value={formData.imageUrl}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, imageUrl: e.target.value });
          }}
          disabled={isCreatingDish}
        />
        <TextField
          fullWidth
          name="places"
          label="Where to find"
          variant="outlined"
          value={formData.places}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, places: e.target.value });
          }}
          style={{ marginBottom: 16 }}
          disabled={isCreatingDish}
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          style={{ marginBottom: 10 }}
          disabled={isCreatingDish}
        >
          {isCreatingDish ? 'Submitting...' : 'Submit'}
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          size="small"
          onClick={clearForm}
          disabled={isCreatingDish}
        >
          Clear
        </Button>
      </StyledForm>
    </CustomPaper>
  );
};

export default DishForm;
