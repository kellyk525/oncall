import React from "react";
import { Category, User, Post } from "shared/types/appTypes";
import { ActionTypes } from "shared/types/storeTypes";

export type GlobalContextObject = {
  userData: User | null;
  signinUser: (
    type: ActionTypes.AUTH,
    payload: { user: User; token: string }
  ) => void;
  logoutUser: (type: ActionTypes.LOGOUT) => void;
  openUpdatePostModal: boolean;
  handleUpdatePostModal: (
    type:
      | ActionTypes.OPEN_UPDATE_POST_MODAL
      | ActionTypes.CLOSE_UPDATE_POST_MODAL
  ) => void;
  categoryId: string | null;
  setCategoryId: (categoryId: string) => void;
  subCategoryId: string | null;
  setSubCategoryId: (categoryId: string) => void;

  post: Post | null;
  categories: Category[];
  loadingCategories: boolean;
  fetchCategoriesError: string | null;
  fetchCategories: () => void;

  addingCategory: boolean;
  addingCategoryError: string | null;
  addCategory: (category: string) => void;

  removingCategory: boolean;
  removingCategoryError: string | null;
  removeCategory: (categoryId: string) => void;

  addingSubCategory: boolean;
  addingSubCategoryError: string | null;
  addSubCategory: (categoryId: string, subCategory: string) => void;

  removingSubCategory: boolean;
  removingSubCategoryError: string | null;
  removeSubCategory: (categoryId: string, subCategoryId: string) => void;

  fetchingPost: boolean;
  fetchingPostError: string | null;
  fetchPost: (postId: string) => void;

  addingPost: boolean;
  addingPostError: string | null;
  addPost: (
    categoryId: string,
    subCategoryId: string,
    title: string,
    description: string,
    creatorId: string
  ) => void;

  removingPost: boolean;
  removingPostError: string | null;
  removePost: (
    categoryId: string,
    subCategoryId: string,
    postId: string,
    creatorId: string
  ) => void;

  updatingPost: boolean;
  updatingPostError: string | null;
  updatePost: (post: Post, creatorId: string) => void;
};

export const GlobalContext = React.createContext<GlobalContextObject>({
  userData: null,
  signinUser: (type, payload) => {},
  logoutUser: () => {},
  openUpdatePostModal: false,
  handleUpdatePostModal: (type) => {},
  categoryId: null,
  setCategoryId: (id) => {},
  subCategoryId: null,
  setSubCategoryId: (id) => {},

  post: null,
  categories: [],
  loadingCategories: false,
  fetchCategoriesError: null,
  fetchCategories: () => {},

  addingCategory: false,
  addingCategoryError: null,
  addCategory: (category) => {},

  removingCategory: false,
  removingCategoryError: null,
  removeCategory: (categoryId) => {},

  addingSubCategory: false,
  addingSubCategoryError: null,
  addSubCategory: (categoryId, subCategory) => {},

  removingSubCategory: false,
  removingSubCategoryError: null,
  removeSubCategory: (categoryId, subCategoryId) => {},

  fetchingPost: false,
  fetchingPostError: null,
  fetchPost: (postId) => {},

  addingPost: false,
  addingPostError: null,
  addPost: (categoryId, subCategoryId, title, description, creatorId) => {},

  removingPost: false,
  removingPostError: null,
  removePost: (categoryId, subCategoryId, postId, creatorId) => {},

  updatingPost: false,
  updatingPostError: null,
  updatePost: (post, creatorId) => {},
});
