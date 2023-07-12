import React from "react";
import AddCategory from "./AddCategory";
import AddSubCategory from "./AddSubCategory";

const Settings: React.FC = () => {
  return (
    <main className="text-sm ml-60 max-w-md p-10">
      <AddCategory />
      <AddSubCategory />
    </main>
  );
};
export default Settings;
