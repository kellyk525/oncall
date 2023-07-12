import React, { FormEvent, useState } from "react";
import useHttp from "../../hooks/useHttp";
import PulseLoader from "react-spinners/PulseLoader";

const AddCategory: React.FC = () => {
  const [category, setCategory] = useState("");
  const { isLoading, error, sendRequest } = useHttp();

  const handleNewCategory = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const request = {
      url: "http://localhost:8000/categories/add-category",
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
      <p className="text-base mb-4">Add a new Category:</p>
      <form onSubmit={handleNewCategory} className="flex flex-col">
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
          className="bg-yellow-500 w-44 py-1 rounded hover:bg-yellow-300"
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
