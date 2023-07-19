import React, { useContext, useEffect, useReducer } from "react";
import { CollectionContext } from "./collectionContext";
import {
  collectionReducer,
  getCollectionDefaultState,
} from "../reducers/collectionReducer";
import {
  fetchUserCollection,
  addPostToCollection,
  addCollection,
  removeCollection,
  removePostFromCollection,
} from "../apis/collection";
import { GlobalContext } from "./globalContext";

const CollectionProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { userData } = useContext(GlobalContext);
  const [collection, collectionDispatchFn] = useReducer(
    collectionReducer,
    {
      collection: [],
      isCollectionLoading: false,
      fetchCollectionError: null,
      addingNewPost: false,
      newPostError: null,
      addingNewCollection: false,
      newCollectionError: null,
      removingPost: false,
      removingPostError: null,
      removingCollection: false,
      removingCollectionError: null,
    },
    getCollectionDefaultState
  );

  useEffect(() => {
    if (userData !== null) {
      handlefetchCollection(userData._id as string);
    }
  }, [userData]);

  const handlefetchCollection = async (creatorId: string) => {
    fetchUserCollection(collectionDispatchFn, creatorId);
  };

  const handleAddCollection = (title: string, creatorId: string) => {
    addCollection(collectionDispatchFn, title, creatorId);
  };

  const handleCollectionRemoval = (collectionId: string, creatorId: string) => {
    removeCollection(collectionDispatchFn, collectionId, creatorId);
  };

  const handleAddPostToCollection = async (
    collectionId: string,
    creatorId: string,
    postId: string
  ) => {
    addPostToCollection(collectionDispatchFn, collectionId, creatorId, postId);
  };

  const handlePostRemoval = (
    collectionId: string,
    postId: string,
    creatorId: string
  ) => {
    removePostFromCollection(
      collectionDispatchFn,
      collectionId,
      postId,
      creatorId
    );
  };

  const contextObject = {
    collection: collection.collection,
    isCollectionLoading: collection.isCollectionLoading,
    fetchCollection: handlefetchCollection,
    fetchCollectionError: collection.fetchCollectionError,
    addingNewPost: collection.addingNewPost,
    addPostToCollection: handleAddPostToCollection,
    newPostError: collection.newPostError,
    addingNewCollection: collection.addingNewCollection,
    newCollectionError: collection.newCollectionError,
    handleAddCollection,
    removingPost: collection.removingPost,
    removingPostError: collection.removingPostError,
    removingCollection: collection.removingCollection,
    removingCollectionError: collection.removingCollectionError,
    handlePostRemoval,
    handleCollectionRemoval,
  };

  return (
    <CollectionContext.Provider value={contextObject}>
      {children}
    </CollectionContext.Provider>
  );
};

export default CollectionProvider;
