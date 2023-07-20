import React, { useEffect, useState, ChangeEvent, useContext } from "react";
import { Category, SubCategory } from "shared/types/appTypes";
import { GlobalContext } from "store/globalContext";
import useHttp from "hooks/useHttp";

const Categories: React.FC = () => {
  const { categoryId, setCategoryId, subCategoryId, setSubCategoryId } =
    useContext(GlobalContext);
  const [categories, setCategories] = useState<Category[]>([]);
  const [mappedCategories, setMappedCategories] = useState<{
    [key: string]: SubCategory[];
  }>({});
  const { isLoading, error, sendRequest } = useHttp();

  const mapCategoriesToSubCategories = (categories: Category[]) => {
    const mappedCategories: { [key: string]: SubCategory[] } = {};
    categories.forEach((category) => {
      mappedCategories[category._id] = category.subCategories;
    });

    setMappedCategories(mappedCategories);
  };

  const handleFetchedCategories = (response: { data: Category[] }) => {
    setCategories(response.data);
    mapCategoriesToSubCategories(response.data);
  };

  const getCategories = () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const request = {
      url: "https://kellyoncall.onrender.com/categories",
      headers,
    };

    sendRequest(request, handleFetchedCategories);
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (categories.length) {
      setCategoryId(categories[0]._id);
      setSubCategoryId(categories[0].subCategories[0]?._id);
    }
  }, [categories]);

  useEffect(() => {
    if (categoryId && mappedCategories[categoryId]) {
      setSubCategoryId(mappedCategories[categoryId][0]?._id);
    }
  }, [categoryId]);

  const handleCategorySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index] as HTMLOptionElement;
    const newCategoryId = el.getAttribute("id");
    setCategoryId(newCategoryId as string);
  };

  const handleSubCategorySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index] as HTMLOptionElement;
    const subCategoryId = el.getAttribute("id");
    setSubCategoryId(subCategoryId as string);
  };

  const getSubCategories = (categoryId: string) => {
    if (!mappedCategories[categoryId]) return;
    return mappedCategories[categoryId].map((subCategory, i) => (
      <option
        key={subCategory._id}
        id={subCategory._id}
        value={subCategory.subCategory}
      >
        {subCategory.subCategory}
      </option>
    ));
  };

  if (isLoading) return <div>loading...</div>;

  return (
    <div className="flex flex-col">
      <div className="mb-3">
        <label htmlFor="category" className="mr-3">
          Pick a Category:
        </label>
        <select
          id="category"
          name="category"
          onChange={handleCategorySelect}
          className="p-1 px-2 rounded-lg border border-slate-300"
        >
          {categories.map((category, i) => (
            <option
              key={category._id}
              id={category._id}
              value={category.category}
            >
              {category.category}
            </option>
          ))}
        </select>
      </div>
      {categoryId && (
        <div className="mb-3">
          <label htmlFor="subCategory" className="mr-3">
            Pick a Sub-Category:
          </label>
          <select
            id="subCategory"
            name="subCategory"
            onChange={handleSubCategorySelect}
            className="p-1 px-2 rounded-lg border border-slate-300"
          >
            {getSubCategories(categoryId)}
          </select>
        </div>
      )}
    </div>
  );
};

export default Categories;
