import React, { FC } from 'react';

import { useGetCategoryApi } from 'hooks';

interface CategoryPageProps {
  match: {
    params: { id: string }
  }
}

const CategoryPage: FC<CategoryPageProps> = ({ match: { params } }) => {
  const {
    data: category,
    loading: isFetchingCategory,
    error
  } = useGetCategoryApi(params.id, { include_dishes: true });
  const dataIsReady = category != null;
  const errorOccurred = error != null;

  if (isFetchingCategory) return <div>Fetching the category...</div>;

  if (errorOccurred)
    return (
      <div>
        An error occurred while fetching the category ({error?.message}).
      </div>
    );

  return dataIsReady ? (
    <>
      <div>{category.attributes.name}</div>
      <div>{category.attributes.title}</div>
      <div>{category.attributes.description}</div>
    </>
  ) : null;
};

export default CategoryPage;
