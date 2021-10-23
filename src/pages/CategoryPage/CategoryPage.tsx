import React, { FC } from 'react';

import { useGetCategoryApi } from 'hooks';

interface CategoryPageProps {
  match: {
    params: { id: string }
  }
}

const CategoryPage: FC<CategoryPageProps> = ({ match }) => {
  const { id } = match.params;
  const {
    loading: fetchingCategory,
    data: category,
    error
  } = useGetCategoryApi(id, { include_dishes: true });

  if (fetchingCategory) return <div>Fetching the category...</div>;

  if (error != null)
    return (
      <div>
        An error occurred while fetching the category ({error?.message}).
      </div>
    );

  return category != null ? (
    <>
      <div>{category.attributes.name}</div>
      <div>{category.attributes.title}</div>
      <div>{category.attributes.description}</div>
    </>
  ) : null;
};

export default CategoryPage;
