import React from "react";
import AddCategory from "./AddCategory";
import AddSubCategory from "./AddSubCategory";
import DeleteCategory from "./DeleteCategory";

const Settings: React.FC = () => {
  return (
    <main className="text-sm ml-60 max-w-md p-10 bg-background">
      <AddCategory />
      <AddSubCategory />
      <DeleteCategory />
    </main>
  );
};
export default Settings;
