import React from "react";
import { Collection } from "../shared/types/collectionTypes";
import { CollectionAction } from "../shared/types/collectionTypes";

export type CollectionContextObject = {
  collection: Collection[];
  isCollectionLoading: boolean;
  fetchCollection: (creatorId: string) => void;
  fetchCollectionError: string | null;
  addingNewPost: boolean;
  addPostToCollection: (
    collectionId: string,
    creatorId: string,
    postId: string
  ) => void;
  newPostError: string | null;
  addingNewCollection: boolean;
  newCollectionError: string | null;
  handleAddCollection: (title: string, creatorId: string) => void;
  removingPost: boolean;
  removingPostError: string | null;
  handlePostRemoval: (
    collectionId: string,
    postId: string,
    creatorId: string
  ) => void;
  removingCollection: boolean;
  removingCollectionError: string | null;
  handleCollectionRemoval: (collectionId: string, creatorId: string) => void;
};

export const CollectionContext = React.createContext<CollectionContextObject>({
  collection: [],
  isCollectionLoading: false,
  fetchCollection: (creatorId) => {},
  fetchCollectionError: null,
  addingNewPost: false,
  addPostToCollection: (collectionId, creatorId, postId) => {},
  newPostError: null,
  addingNewCollection: false,
  newCollectionError: null,
  handleAddCollection: (title, creatorId) => {},
  removingPost: false,
  removingPostError: null,
  handlePostRemoval: (collectionId, postId, creatorId) => {},
  removingCollection: false,
  removingCollectionError: null,
  handleCollectionRemoval: (collectionId, creatorId) => {},
});
