import React, { FormEvent, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import useHttp from "hooks/useHttp";

const AddCategory: React.FC = () => {
  const [category, setCategory] = useState("");
  const { isLoading, error, sendRequest } = useHttp();

  const handleNewCategory = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const request = {
      url: "https://kellyoncall.onrender.com/categories/add-category",
      method: "POST",
      headers,
      body: {
        category,
      },
    };

    sendRequest(request, () => {});
  };

  return (
    <div className="mb-6">
      <p className="font-semibold mb-4">Add a new Category:</p>
      <form
        onSubmit={handleNewCategory}
        className="flex flex-col bg-gray-200 p-4 rounded-lg"
      >
        <div className="mb-4">
          <label htmlFor="category">Category Name:</label>
          <input
            id="category"
            type="text"
            onChange={(e) => setCategory(e.target.value)}
            className="p-1 rounded ml-2"
          />
        </div>
        <button
          type="submit"
          className="bg-white w-44 py-1 rounded-xl hover:bg-gray-50"
        >
          {isLoading ? (
            <PulseLoader
              size={5}
              color={"grey"}
              loading={isLoading}
              aria-label="Loading Spinner"
            />
          ) : (
            "Submit a new category"
          )}
        </button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
};

export default AddCategory;
