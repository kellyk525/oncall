import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { GlobalContext } from "store/globalContext";

const AddSubCategory: React.FC = () => {
  const [categoryId, setCategoryId] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const {
    categories,
    addSubCategory,
    addingSubCategory,
    addingSubCategoryError,
  } = useContext(GlobalContext);

  useEffect(() => {
    if (categories.length > 0) {
      setCategoryId(categories[0]._id);
    }
  }, [categories]);

  const handleNewSubCategory = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addSubCategory(categoryId, subCategory);
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
          {addingSubCategory ? (
            <PulseLoader
              size={5}
              color={"grey"}
              loading={addingSubCategory}
              aria-label="Adding New SubCategory"
            />
          ) : (
            "Submit new sub-category"
          )}
        </button>
      </form>
      {addingSubCategoryError && <div>{addingSubCategoryError}</div>}
    </div>
  );
};

export default AddSubCategory;
