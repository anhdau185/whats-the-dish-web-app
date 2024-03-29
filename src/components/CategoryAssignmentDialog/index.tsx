import React, { useCallback, useEffect, useMemo, useState } from 'react';
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

import { Category, PartialRawCategory } from 'models';
import { useFetchDishesApi } from 'common/hooks';

interface CategoryAssignmentDialogProps {
  open: boolean;
  closeDialog: () => void;
  data: Category;
  updateData: (
    id: string,
    submittedData: PartialRawCategory
  ) => void | Promise<void>;
}

const CategoryAssignmentDialog: React.FC<CategoryAssignmentDialogProps> = ({
  open,
  closeDialog,
  data,
  updateData
}) => {
  const initialSelectedIds = useMemo(
    () => data.relationships?.dishes.data.map(item => item.id) ?? [],
    [data]
  );

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
  }, [initialSelectedIds]);

  const handleSubmit = useCallback(() => {
    const dataToSubmit: PartialRawCategory = {
      attributes: {
        dish_ids: selectedIds
      }
    };
    updateData(data.id, dataToSubmit);
    closeDialog();
  }, [data.id, selectedIds]);

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
  }, [initialSelectedIds]);

  return (
    <Dialog maxWidth="xs" open={open}>
      <DialogTitle>Assign dishes to the category</DialogTitle>
      <DialogContent dividers style={{ maxHeight: 360 }}>
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
