import React, {
  useContext,
  useState,
  ChangeEvent,
  useEffect,
  FormEvent,
} from "react";
import useHttp from "../../hooks/useHttp";
import { GlobalContext } from "../../store/globalContext";
import PulseLoader from "react-spinners/PulseLoader";

const DeleteCategory: React.FC = () => {
  const { categories, deleteCategory } = useContext(GlobalContext);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { isLoading, error, sendRequest } = useHttp();

  const handleCategorySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index] as HTMLOptionElement;
    const categoryId = el.getAttribute("id");
    setSelectedId(categoryId as string);
  };

  const handleDeleteCategory = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const request = {
      method: "DELETE",
      url: `http://localhost:8000/categories/${selectedId}`,
      headers: {},
    };

    sendRequest(request, () => {});
    deleteCategory(selectedId as string);
  };

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedId(categories[0]._id);
    }
  }, [categories]);

  if (categories.length < 1) {
    return <div>No categories to show.</div>;
  }

  return (
    <form onSubmit={handleDeleteCategory}>
      <label>Pick a category to delete:</label>
      <select onChange={handleCategorySelect}>
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
      <button type="submit">
        {isLoading ? (
          <PulseLoader
            size={5}
            color={"grey"}
            loading={isLoading}
            aria-label="Loading Spinner"
          />
        ) : (
          "Delete category"
        )}
      </button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default DeleteCategory;
