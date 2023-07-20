import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PiTrash } from "react-icons/pi";

import { GlobalContext } from "store/globalContext";
import { CollectionContext } from "store/collectionContext";
import AddCollection from "components/Settings/AddCollection";

const Collections: React.FC = () => {
  const {
    isCollectionLoading,
    collection,
    fetchCollectionError,
    handlePostRemoval,
    removingCollection,
    removingCollectionError,
    handleCollectionRemoval,
  } = useContext(CollectionContext);
  const { userData } = useContext(GlobalContext);

  const removePostFromCollection = (
    collectionId: string,
    postId: string,
    creatorId: string
  ) => {
    handlePostRemoval(collectionId, postId, creatorId);
  };

  const removeCollection = (collectionId: string, creatorId: string) => {
    handleCollectionRemoval(collectionId, creatorId);
  };

  return (
    <div className="ml-60 max-w-5xl h-screen bg-background text-sm p-3 px-6">
      <AddCollection />
      {isCollectionLoading ? (
        <div>Loading your collections...</div>
      ) : (
        <div className="mt-5">
          <p className="font-semibold mb-3">Collections:</p>
          {collection.map((item) => (
            <div key={item._id} className="mb-4">
              <div className="flex items-center pr-3 mb-3">
                <div>{item.title}</div>
                {userData ? (
                  <>
                    <button
                      className="p-1 px-2 ml-4 bg-white rounded hover:bg-gray-100"
                      onClick={() => removeCollection(item._id, userData._id)}
                    >
                      Delete Collection
                    </button>
                  </>
                ) : null}
              </div>
              <div className="px-2 py-2 bg-white divide-y divide-slate-200 rounded-lg">
                {item.posts.length ? (
                  item.posts.map((post) => (
                    <div
                      key={post._id}
                      className="p-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                    >
                      <Link
                        to={`http://localhost:3000/posts/${post._id}`}
                        className="flex justify-between"
                      >
                        <div>{post.title}</div>
                        {userData ? (
                          <button
                            onClick={() =>
                              removePostFromCollection(
                                item._id,
                                post._id,
                                userData._id
                              )
                            }
                          >
                            <PiTrash />
                          </button>
                        ) : null}
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="p-2">Add posts to your collection!</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {fetchCollectionError && <div>{fetchCollectionError}</div>}
      {removingCollectionError && <div>{removingCollectionError}</div>}
    </div>
  );
};

export default Collections;
