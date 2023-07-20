import React, { useContext } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { GlobalContext } from "store/globalContext";

const Main: React.FC = () => {
  const { categories } = useContext(GlobalContext);

  return (
    <div className="bg-background font-text1 font-medium ml-60 max-w-5xl min-h-screen p-6">
      {categories.length > 0 ? (
        <>
          {categories.map((category) => (
            <div key={category._id} className="mb-6 border-b">
              <h2 className="text-sm font-bold tracking-widest mb-4">
                {category.category}
              </h2>
              <div className="bg-white py-4 rounded-3xl">
                {category.subCategories.map((subCat) => (
                  <div key={subCat._id} className="text-sm mb-2 last:mb-0">
                    <div className="mb-2 ml-4 bg-sky-100 w-content inline-block p-1 px-4 rounded-2xl">
                      #{subCat.subCategory}
                    </div>
                    <div className="divide-y divide-slate-200">
                      {subCat.posts.map((post) => (
                        <Link
                          to={`/posts/${post._id}`}
                          key={post._id}
                          className="flex max-w-5xl justify-between p-2 px-3 mx-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                        >
                          <p>{post.title}</p>
                          <p>{moment(post.createdAt).fromNow()}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="text-base">Loading Posts...</div>
      )}
    </div>
  );
};

export default Main;
