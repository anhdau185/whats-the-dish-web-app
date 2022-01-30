import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Button, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { Category, Dish, PartialRawCategory } from 'models';
import { MoreMenuItems } from 'components/MoreMenu';
import CategoryAssignmentList from 'components/DishList';
import CategoryAssignmentDialog from 'components/CategoryAssignmentDialog';

interface CategoryAssignmentProps {
  category: Category;
  assignedDishes: Dish[];
  updateCategory: (
    id: string,
    submittedData: PartialRawCategory
  ) => void | Promise<void>;
  getItemActions?: (dishId: string) => MoreMenuItems;
}

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;

  button {
    margin-left: 1rem;
  }
`;

const CategoryAssignment: FC<CategoryAssignmentProps> = ({
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
          variant="contained"
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
