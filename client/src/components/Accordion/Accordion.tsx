import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Category, SubCategory } from "shared/types/appTypes";

const SecondLevel: React.FC<{ subCategory: SubCategory }> = ({
  subCategory,
}) => {
  const [selected, setSelected] = useState("");
  const toggle = () => {
    setSelected((prev) => (prev === "" ? "active" : ""));
  };

  const hasChildren = () => {
    return Array.isArray(subCategory.posts) && subCategory.posts.length > 0;
  };
  return (
    <>
      <div
        onClick={toggle}
        className={`flex pb-1 text-sm ${
          hasChildren() ? "cursor-pointer" : "cursor-auto"
        }`}
      >
        <p>{subCategory.subCategory}</p>
        {hasChildren() && (
          <span className="ml-1">{selected === "active" ? "-" : "+"}</span>
        )}
      </div>
      {selected === "active" && hasChildren() ? (
        <div className="ml-5 flex flex-col">
          {subCategory.posts.map((post, i) => (
            <Link
              to={`/posts/${post._id}`}
              key={`${i}-${post._id}`}
              className="pb-1 text-sm"
            >
              {post.title}
            </Link>
          ))}
        </div>
      ) : null}
    </>
  );
};

const FirstLevel: React.FC<{ category: Category }> = ({ category }) => {
  const [selected, setSelected] = useState("");
  const toggle = () => {
    setSelected((prev) => (prev === "" ? "active" : ""));
  };

  const hasChildren = () => {
    return (
      Array.isArray(category.subCategories) && category.subCategories.length > 0
    );
  };

  return (
    <>
      <div
        onClick={toggle}
        className={`flex pb-1 text-sm ${
          hasChildren() ? "cursor-pointer" : "cursor-auto"
        }`}
      >
        <p className="font-medium">{category.category}</p>
        {hasChildren() && (
          <span className="ml-1">{selected === "active" ? "-" : "+"}</span>
        )}
      </div>
      {selected === "active" && hasChildren() ? (
        <div className="ml-3">
          {category.subCategories.map((sub) => (
            <SecondLevel key={sub._id} subCategory={sub} />
          ))}
        </div>
      ) : null}
    </>
  );
};

const Accordion: React.FC<{ data: Category[] }> = ({ data }) => {
  return (
    <>
      {data.map((item) => (
        <FirstLevel key={item._id} category={item} />
      ))}
    </>
  );
};

export default Accordion;
