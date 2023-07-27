import React from "react";
import AddCategory from "./AddCategory";
import AddSubCategory from "./AddSubCategory";
import DeleteCategory from "./DeleteCategory";
import DeleteSubCategory from "./DeleteSubCategory";

const Settings: React.FC = () => {
  return (
    <main className="text-sm ml-60 max-w-5xl min-h-screen p-10 bg-background">
      <AddCategory />
      <AddSubCategory />
      <DeleteCategory />
      <DeleteSubCategory />
    </main>
  );
};
export default Settings;
