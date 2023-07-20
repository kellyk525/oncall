import React, { FormEvent, useContext, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { GlobalContext } from "store/globalContext";
import { CollectionContext } from "store/collectionContext";

const AddCollection: React.FC = () => {
  const [title, setTitle] = useState("");
  const { userData } = useContext(GlobalContext);
  const { handleAddCollection, addingNewCollection, newCollectionError } =
    useContext(CollectionContext);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userData) {
      handleAddCollection(title.toLowerCase().trim(), userData?._id);
    }
  };

  return (
    <div className="my-2">
      <p className="font-semibold">Add New Collection:</p>
      <form onSubmit={handleSubmit} className="flex flex-row items-center">
        <label htmlFor="title">Collection Title:</label>
        <input
          id="title"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 mx-3 my-3 rounded"
          required
        />
        <button
          type="submit"
          className="w-fit p-2 px-3 bg-black hover:bg-slate-800 text-white rounded"
        >
          {addingNewCollection ? (
            <PulseLoader
              size={5}
              color={"grey"}
              loading={addingNewCollection}
              aria-label="Loading Spinner"
            />
          ) : (
            "Submit"
          )}
        </button>
      </form>
      {newCollectionError && <div>{newCollectionError}</div>}
    </div>
  );
};

export default AddCollection;
