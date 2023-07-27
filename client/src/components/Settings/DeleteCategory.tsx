import React, {
  useContext,
  useState,
  ChangeEvent,
  useEffect,
  FormEvent,
} from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { GlobalContext } from "store/globalContext";

const DeleteCategory: React.FC = () => {
  const {
    categories,
    removeCategory,
    removingCategory,
    removingCategoryError,
  } = useContext(GlobalContext);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleCategorySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index] as HTMLOptionElement;
    const categoryId = el.getAttribute("id");
    setSelectedId(categoryId as string);
  };

  const handleDeleteCategory = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    removeCategory(selectedId as string);
  };

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedId(categories[0]._id);
    }
  }, [categories]);

  return (
    <div className="mb-4">
      <p className="font-semibold mb-4">Delete Category:</p>
      <form
        onSubmit={handleDeleteCategory}
        className="bg-gray-200 p-4 rounded-lg"
      >
        <div className="mb-4">
          <label>Pick a category to delete:</label>
          <select onChange={handleCategorySelect} className="ml-2 p-1 rounded">
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
        <button
          type="submit"
          className="py-1 px-3 bg-white hover:bg-gray-50 rounded-2xl"
        >
          {removingCategory ? (
            <PulseLoader
              size={5}
              color={"grey"}
              loading={removingCategory}
              aria-label="Deleting Category"
            />
          ) : (
            "Delete category"
          )}
        </button>
      </form>
      {removingCategoryError && <div>{removingCategoryError}</div>}
    </div>
  );
};

export default DeleteCategory;
