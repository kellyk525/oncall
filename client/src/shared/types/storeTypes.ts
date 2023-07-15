import { Category, User } from "./appTypes";

export type State = {
  userData: User | null;
};

export type PostsState = {
  openUpdatePostModal: boolean;
  categoryId: string | null;
  subCategoryId: string | null;
  categories: Category[];
};

export enum ActionTypes {
  AUTH = "AUTH",
  LOGOUT = "LOGOUT",
  OPEN_UPDATE_POST_MODAL = "OPEN_UPDATE_POST_MODAL",
  CLOSE_UPDATE_POST_MODAL = "CLOSE_UPDATE_POST_MODAL",
  SET_SELECTED_CATEGORY = "SET_SELECTED_CATEGORY",
  SET_SELECTED_SUB_CATEGORY = "SET_SELECTED_SUB_CATEGORY",
  FETCH_CATEGORIES = "FETCH_CATEGORIES",
  DELETE_CATEGORY = "DELETE_CATEGORY",
}

export interface ActionA {
  type: ActionTypes.AUTH;
  payload: {
    user: User;
    token: string;
  };
}

export interface ActionB {
  type: ActionTypes.LOGOUT;
}

export interface ActionC {
  type: ActionTypes.OPEN_UPDATE_POST_MODAL;
}

export interface ActionD {
  type: ActionTypes.CLOSE_UPDATE_POST_MODAL;
}

export interface ActionE {
  type: ActionTypes.SET_SELECTED_CATEGORY;
  payload: string;
}

export interface ActionF {
  type: ActionTypes.SET_SELECTED_SUB_CATEGORY;
  payload: string;
}

export interface ActionG {
  type: ActionTypes.FETCH_CATEGORIES;
  payload: Category[];
}

export interface ActionH {
  type: ActionTypes.DELETE_CATEGORY;
  payload: string;
}

export type Action =
  | ActionA
  | ActionB
  | ActionC
  | ActionD
  | ActionE
  | ActionF
  | ActionG
  | ActionH;
