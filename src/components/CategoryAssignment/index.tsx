import React, { useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { Category, Dish, PartialRawCategory } from 'models';
import { ActionMenuItems } from 'components/ActionMenu';
import CategoryAssignmentList from 'components/DishList';
import CategoryAssignmentDialog from 'components/CategoryAssignmentDialog';

import { FlexWrapper } from './styles';

interface CategoryAssignmentProps {
  category: Category;
  assignedDishes: Dish[];
  updateCategory: (
    id: string,
    submittedData: PartialRawCategory
  ) => void | Promise<void>;
  getItemActions?: (dishId: string) => ActionMenuItems;
}

const CategoryAssignment: React.FC<CategoryAssignmentProps> = ({
  category,
  assignedDishes,
  updateCategory,
  getItemActions
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <FlexWrapper>
        <Typography variant="h5" color="textPrimary">
          Dishes assigned to this category
        </Typography>
        <Button
          color="primary"
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Assign dishes
        </Button>
        <CategoryAssignmentDialog
          open={open}
          closeDialog={() => setOpen(false)}
          data={category}
          updateData={updateCategory}
        />
      </FlexWrapper>
      <CategoryAssignmentList
        dishes={assignedDishes}
        emptyText="There isn't any dish yet. Would you like to add one?"
        getItemActions={getItemActions}
        itemBreakpoints={{ xs: 12, sm: 6, md: 3 }}
      />
    </>
  );
};

export default CategoryAssignment;
