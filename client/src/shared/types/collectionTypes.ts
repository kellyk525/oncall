import { Post } from "./appTypes";

export type Collection = {
  _id: string;
  title: string;
  posts: Post[];
  creatorId: string;
  createdAt: Date;
};

export type CollectionState = {
  collection: Collection[];
  isCollectionLoading: boolean;
  fetchCollectionError: string | null;
  addingNewPost: boolean;
  newPostError: string | null;
  addingNewCollection: boolean;
  newCollectionError: string | null;
  removingPost: boolean;
  removingPostError: string | null;
  removingCollection: boolean;
  removingCollectionError: string | null;
};

export enum CollectionActionTypes {
  ADD_COLLECTION = "ADD_COLLECTION",
  ADDING_NEW_COLLECTION = "ADDING_NEW_COLLECTION",
  NEW_COLLECTION_ERROR = "NEW_COLLECTION_ERROR",
  FETCH_COLLECTION = "FETCH_COLLECTION",
  COLLECTION_LOADING = "COLLECTION_LOADING",
  LOADING_ERROR = "LOADING_ERROR",
  ADD_POST_TO_COLLECTION = "ADD_POST_TO_COLLECTION",
  ADDING_NEW_POST = "ADDING_NEW_POST",
  NEW_POST_ERROR = "NEW_POST_ERROR",
  REMOVE_POST_FROM_COLLECTION = "REMOVE_POST_FROM_COLLECTION",
  DELETE_COLLECTION = "DELETE_COLLECTION",
  START_REMOVING_POST = "START_REMOVING_POST",
  POST_REMOVE_ERROR = "POST_REMOVE_ERROR",
  START_DELETING_COLLECTION = "START_DELETING_COLLECTION",
  COLLECTION_DELETE_ERROR = "COLLECTION_DELETE_ERROR",
}

export interface CollectionActionA {
  type: CollectionActionTypes.ADD_COLLECTION;
  payload: Collection;
}

export interface CollectionActionB {
  type: CollectionActionTypes.FETCH_COLLECTION;
  payload: Collection[];
}

export interface CollectionActionC {
  type: CollectionActionTypes.ADD_POST_TO_COLLECTION;
  payload: {
    collectionId: string;
    post: Post;
  };
}

export interface CollectionActionD {
  type: CollectionActionTypes.REMOVE_POST_FROM_COLLECTION;
  payload: {
    collectionId: string;
    postId: string;
  };
}

export interface CollectionActionE {
  type: CollectionActionTypes.DELETE_COLLECTION;
  payload: string;
}

export interface CollectionActionF {
  type: CollectionActionTypes.COLLECTION_LOADING;
  payload: boolean;
}

export interface CollectionActionG {
  type: CollectionActionTypes.LOADING_ERROR;
  payload: string;
}

export interface CollectionActionH {
  type: CollectionActionTypes.ADDING_NEW_POST;
  payload: boolean;
}

export interface CollectionActionI {
  type: CollectionActionTypes.NEW_POST_ERROR;
  payload: string;
}

export interface CollectionActionJ {
  type: CollectionActionTypes.ADDING_NEW_COLLECTION;
  payload: boolean;
}

export interface CollectionActionK {
  type: CollectionActionTypes.NEW_COLLECTION_ERROR;
  payload: string;
}
export interface CollectionActionL {
  type: CollectionActionTypes.START_REMOVING_POST;
  payload: boolean;
}
export interface CollectionActionM {
  type: CollectionActionTypes.POST_REMOVE_ERROR;
  payload: string;
}
export interface CollectionActionN {
  type: CollectionActionTypes.START_DELETING_COLLECTION;
  payload: boolean;
}
export interface CollectionActionO {
  type: CollectionActionTypes.COLLECTION_DELETE_ERROR;
  payload: string;
}

export type CollectionAction =
  | CollectionActionA
  | CollectionActionB
  | CollectionActionC
  | CollectionActionD
  | CollectionActionE
  | CollectionActionF
  | CollectionActionG
  | CollectionActionH
  | CollectionActionI
  | CollectionActionJ
  | CollectionActionK
  | CollectionActionL
  | CollectionActionM
  | CollectionActionN
  | CollectionActionO;
