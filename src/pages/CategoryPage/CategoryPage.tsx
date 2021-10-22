import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { categoriesSelector } from 'reducers/state';
import { NullableCategory } from 'models';

interface CategoryPageProps {
  match: {
    params: { id: string }
  }
}

const CategoryPage: FC<CategoryPageProps> = ({ match }) => {
  const { id } = match.params;
  const categories = useSelector(categoriesSelector);
  const category = useMemo<NullableCategory>(
    () => categories.find(category => category.id === id) || null,
    [categories]
  );

  return category ? (
    <>
      <div>{category.attributes.name}</div>
      <div>{category.attributes.title}</div>
      <div>{category.attributes.description}</div>
    </>
  ) : (
    <div>Error: Category not found.</div>
  );
};

export default CategoryPage;
