import React, { FormEvent, useContext, useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { GlobalContext } from "store/globalContext";

const AddCategory: React.FC = () => {
  const [category, setCategory] = useState("");
  const { addCategory, addingCategory, addingCategoryError } =
    useContext(GlobalContext);

  const handleNewCategory = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addCategory(category);
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
          {addingCategory ? (
            <PulseLoader
              size={5}
              color={"grey"}
              loading={addingCategory}
              aria-label="Adding New Category"
            />
          ) : (
            "Submit a new category"
          )}
        </button>
      </form>
      {addingCategoryError && <div>{addingCategoryError}</div>}
    </div>
  );
};

export default AddCategory;
