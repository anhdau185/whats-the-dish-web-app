import React, { FC, useCallback, useEffect, useState } from 'react';
import isEmpty from 'lodash/fp/isEmpty';
import includes from 'lodash/fp/includes';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Typography
} from '@material-ui/core';

import { Category, RawCategory } from 'models';
import { useFetchDishesApi } from 'hooks';

interface CategoryAssignmentDialogProps {
  open: boolean;
  closeDialog: () => void;
  data: Category;
  updateData:
    (id: string, submittedData: RawCategory) => void | Promise<void>;
}

const CategoryAssignmentDialog: FC<CategoryAssignmentDialogProps> = ({
  open,
  closeDialog,
  data,
  updateData
}) => {
  const initialSelectedIds =
    data.relationships?.dishes.data.map(item => item.id) ?? [];
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { data: dishes, loading: isFetchingDishes, fetchData: fetchDishes } =
    useFetchDishesApi();

  const handleChange = useCallback(
    (targetId: string) =>
      (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        if (checked)
          setSelectedIds([...selectedIds, targetId]);
        else
          setSelectedIds(selectedIds.filter(id => id !== targetId));
      },
    [selectedIds]
  );

  const handleCancel = useCallback(() => {
    setSelectedIds(initialSelectedIds);
    closeDialog();
  }, [data, selectedIds]);

  const handleSubmit = useCallback(() => {
    const dataToSubmit: RawCategory = {
      attributes: {
        name: data.attributes.name,
        title: data.attributes.title,
        description: data.attributes.description,
        images: data.attributes.images,
        dish_ids: selectedIds
      }
    };
    updateData(data.id, dataToSubmit);
    closeDialog();
  }, [data, selectedIds]);

  useEffect(() => {
    if (open && isEmpty(dishes))
      fetchDishes({
        include_categories: false,
        order_by: 'title',
        order_direction: 'asc'
      });
  }, [open, dishes]);

  useEffect(() => {
    setSelectedIds(initialSelectedIds);
  }, [data]);

  return (
    <Dialog maxWidth="xs" open={open}>
      <DialogTitle>Assign dishes to the category</DialogTitle>
      <DialogContent dividers>
        <FormGroup>
          {isEmpty(dishes) && isFetchingDishes && (
            <Typography variant="body1" color="textSecondary">
              Hang tight, we&apos;re fetching the dishes...
            </Typography>
          )}
          {dishes.map(item => (
            <FormControlLabel
              key={item.id}
              label={item.attributes.title}
              checked={includes(item.id, selectedIds)}
              control={<Checkbox color="secondary" onChange={handleChange(item.id)} />}
            />
          ))}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus variant="text" color="primary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryAssignmentDialog;
