import React from "react";
import { Category, User } from "shared/types/appTypes";
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
  categories: Category[];
  fetchCategories: (categories: Category[]) => void;
  deleteCategory: (categoryId: string) => void;
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
  categories: [],
  fetchCategories: (categories) => {},
  deleteCategory: (catId) => {},
});
