import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { GlobalContext } from "store/globalContext";
import { Category, SubCategory } from "shared/types/appTypes";

const DeleteSubCategory: React.FC = () => {
  const {
    categories,
    removeSubCategory,
    removingSubCategory,
    removingSubCategoryError,
  } = useContext(GlobalContext);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [subCategoryId, setSubCategoryId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [mappedCategory, setMappedCategory] = useState<{
    [key: string]: SubCategory[];
  }>({});

  const mapCategoryToSubCat = (categories: Category[]) => {
    const mappedCategories: { [key: string]: SubCategory[] } = {};

    categories.forEach((category) => {
      mappedCategories[category._id] = category.subCategories;
    });
    setMappedCategory(mappedCategories);
  };

  useEffect(() => {
    if (categories.length > 0) {
      setCategoryId(categories[0]._id);
      mapCategoryToSubCat(categories);
    }
  }, [categories]);

  const handleCategorySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index] as HTMLOptionElement;
    const selectedCategoryId = el.getAttribute("id");
    setCategoryId(selectedCategoryId);
  };

  const handleSubCategorySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index] as HTMLOptionElement;
    const selectedSubCategoryId = el.getAttribute("id");
    setSubCategoryId(selectedSubCategoryId);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (categoryId == null || subCategoryId == null) {
      setFormError("Please select a sub-category to delete");
      return;
    }

    removeSubCategory(categoryId, subCategoryId);
  };

  return (
    <div className="mb-6">
      <p className="font-semibold mb-4">Delete Sub-Category:</p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-gray-200 p-4 rounded-lg"
      >
        <div className="mb-4">
          <label htmlFor="category-delete">Pick a category:</label>
          <select
            id="category-delete"
            name="category"
            className="p-1 rounded ml-2"
            onChange={(e) => handleCategorySelect(e)}
          >
            {categories.map((category) => (
              <option
                id={category._id}
                key={category._id}
                value={category.category}
              >
                {category.category}
              </option>
            ))}
          </select>
        </div>
        {categoryId ? (
          <div className="mb-4">
            <label htmlFor="sub-category-delete">
              Pick a sub-category to delete:
            </label>
            <select
              id="sub-category-delete"
              name="subCategory"
              className="p-1 rounded ml-2"
              onChange={(e) => handleSubCategorySelect(e)}
            >
              {mappedCategory[categoryId].map((subCat) => (
                <option
                  id={subCat._id}
                  key={subCat._id}
                  value={subCat.subCategory}
                >
                  {subCat.subCategory}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="mb-4">Please select a category first!</div>
        )}
        <button
          type="submit"
          className="bg-white w-48 py-1 rounded-xl hover:bg-gray-50"
        >
          {removingSubCategory ? (
            <PulseLoader
              size={5}
              color={"grey"}
              loading={removingSubCategory}
              aria-label="DeletingSub-Category"
            />
          ) : (
            "Delete Sub-Category"
          )}
        </button>
      </form>
      {formError && <div>{formError}</div>}
      {removingSubCategoryError && <div>{removingSubCategoryError}</div>}
    </div>
  );
};

export default DeleteSubCategory;
