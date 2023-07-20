import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { CollectionContext } from "store/collectionContext";
import { GlobalContext } from "store/globalContext";
import { BsFolderPlus } from "react-icons/bs";

const AddPostToCollection: React.FC<{ postId: string }> = ({ postId }) => {
  const { userData } = useContext(GlobalContext);
  const { collection, addPostToCollection } = useContext(CollectionContext);
  const [selectedCollectionId, setSelectedCollectionId] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (collection.length > 0) {
      setSelectedCollectionId(collection[0]._id);
    }
  }, [collection]);

  const handlePostAddition = () => {
    addPostToCollection(
      selectedCollectionId as string,
      postId,
      userData?._id as string
    );
  };

  const handleSelectedCollection = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedIdx = e.target.selectedIndex;
    const selectedChild = e.target.childNodes[selectedIdx] as HTMLOptionElement;
    const collectionId = selectedChild.getAttribute("id");
    setSelectedCollectionId(collectionId);
  };

  if (!collection) {
    return <div>Loading</div>;
  }

  return (
    <div className="text-sm bg-white p-4 rounded">
      <div className="font-medium mb-3 px-3">
        Save the post in your collections!
      </div>
      <div className="flex">
        <select
          onChange={handleSelectedCollection}
          className="p-2 cursor-pointer mr-3"
        >
          {collection.length > 0 &&
            collection.map((item) => (
              <option key={item._id} id={item._id}>
                {item.title}
              </option>
            ))}
        </select>
        <button
          className="flex items-center rounded bg-white p-2 px-3 text-sm border"
          onClick={handlePostAddition}
        >
          <div className="mr-2">Add Post To Collection</div>
          <BsFolderPlus size={14} />
        </button>
      </div>
    </div>
  );
};

export default AddPostToCollection;
