import React, { FC, useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Paper, TextField, Typography } from '@material-ui/core';

import { EmptyProps, getDishImages } from 'utils';
import { RawDish } from 'models';
import { currentDishSelector } from 'reducers/state';
// import createDish from 'actions/createDish';
// import updateDish from 'actions/updateDish';
import removeCurrentDish from 'actions/removeCurrentDish';

import useStyles from './styles';

interface DishFormData {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  places: string;
}

const DishForm: FC<EmptyProps> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentDish = useSelector(currentDishSelector);
  const anyDishSelected = currentDish != null;

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

  const validateForm = useCallback((): boolean => {
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
  }, [formData]);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (anyDishSelected) {
      const { dishAlbum } = getDishImages(currentDish);
      const dataToSubmit: RawDish = {
        attributes: {
          name: formData.name,
          title: formData.title || formData.name,
          description: formData.description,
          images: [formData.imageUrl, ...dishAlbum],
          places: formData.places ? formData.places.split(',') : []
        }
      };

      // dispatch(
      //   updateDish({
      //     id: currentDish.id,
      //     dish: dataToSubmit,
      //     onCompletion: () => dispatch(removeCurrentDish())
      //   })
      // );
    } else {
      const dataToSubmit: RawDish = {
        attributes: {
          name: formData.name,
          title: formData.title || formData.name,
          description: formData.description,
          images: formData.imageUrl ? [formData.imageUrl] : [],
          places: formData.places ? formData.places.split(',') : []
        }
      };

      // dispatch(
      //   createDish({
      //     dish: dataToSubmit,
      //     onCompletion: clearForm
      //   })
      // );
    }
  }, [currentDish, formData]);

  useEffect(() => {
    if (anyDishSelected) {
      setFormData({
        name: currentDish.attributes.name,
        title: currentDish.attributes.title,
        description: currentDish.attributes.description || '',
        imageUrl: currentDish.attributes.images[0] || '',
        places: currentDish.attributes.places.join(',')
      });
    } else {
      clearForm();
    }
  }, [currentDish]);

  useEffect(() => () => {
    dispatch(removeCurrentDish());
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
          {anyDishSelected ? 'Edit' : 'Create'} a Dish
        </Typography>
        {anyDishSelected && (
          <>
            <Typography
              variant="body2"
              align="center"
              style={{ marginBottom: 8, width: '100%' }}
            >
              {'Now editing '}
              <b>{currentDish.attributes.name}</b>
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              style={{ marginBottom: 16 }}
              onClick={() => dispatch(removeCurrentDish())}
            >
              Create a new dish
            </Button>
          </>
        )}
        <TextField
          fullWidth
          name="name"
          label="*Dish name"
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
          label="Dish image URL"
          variant="outlined"
          value={formData.imageUrl}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, imageUrl: e.target.value });
          }}
          style={{ marginBottom: 16 }}
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
        />
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
          onClick={clearForm}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default DishForm;