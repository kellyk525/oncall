import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { Category } from "shared/types/appTypes";
import useHttp from "hooks/useHttp";

const AddSubCategory: React.FC = () => {
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategory, setSubCategory] = useState("");
  const { isLoading, error, sendRequest } = useHttp();
  const {
    isLoading: isCategoryLoading,
    error: categoryError,
    sendRequest: fetchCategories,
  } = useHttp();

  const handleFetchedCategories = (response: { data: Category[] }) => {
    setCategories(response.data);
    setCategoryId(response.data[0]._id);
  };

  const getCategories = () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const request = {
      url: "http://localhost:8000/categories",
      headers,
    };

    fetchCategories(request, handleFetchedCategories);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleNewSubCategory = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    console.log(categoryId, subCategory);
    const request = {
      url: "http://localhost:8000/sub-categories/add-subcategory",
      method: "POST",
      headers,
      body: {
        categoryId,
        subCategory,
      },
    };

    sendRequest(request, () => {});
  };

  const handleCategorySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index] as HTMLOptionElement;
    const categoryId = el.getAttribute("id");
    setCategoryId(categoryId as string);
  };

  return (
    <div className="mb-6">
      <p className="font-semibold mb-4">Add a new Sub-Category:</p>
      <form
        onSubmit={handleNewSubCategory}
        className="flex flex-col bg-gray-200 p-4 rounded-lg"
      >
        <div className="mb-4">
          <label>Pick a Category:</label>
          <select
            name="category"
            onChange={(e) => handleCategorySelect(e)}
            className="p-1 rounded ml-2"
          >
            {categories.map((category) => (
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
        <div className="mb-4">
          <label htmlFor="sub-category">Sub-Category Name:</label>
          <input
            id="sub-category"
            name="subCategory"
            type="text"
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className="p-1 rounded ml-2"
          />
        </div>
        <button
          type="submit"
          className="bg-white w-48 py-1 rounded-xl hover:bg-gray-50"
        >
          {isLoading ? (
            <PulseLoader
              size={5}
              color={"grey"}
              loading={isLoading}
              aria-label="Loading Spinner"
            />
          ) : (
            "Submit new sub-category"
          )}
        </button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
};

export default AddSubCategory;
