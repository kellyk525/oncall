import { Category, Post, SubCategory } from "./appTypes";

export type CategoryState = {
  post: Post | null;
  categories: Category[];
  loadingCategories: boolean;
  fetchCategoriesError: string | null;
  addingCategory: boolean;
  addingCategoryError: string | null;
  removingCategory: boolean;
  removingCategoryError: string | null;
  addingSubCategory: boolean;
  addingSubCategoryError: string | null;
  removingSubCategory: boolean;
  removingSubCategoryError: string | null;
  fetchingPost: boolean;
  fetchingPostError: string | null;
  addingPost: boolean;
  addingPostError: string | null;
  removingPost: boolean;
  removingPostError: string | null;
  updatingPost: boolean;
  updatingPostError: string | null;
};

export enum CategoryActionTypes {
  FETCH_CATEGORIES = "FETCH_CATEGORIES",
  LOADING_CATEGORIES = "LOADING_CATEGORIES",
  FETCH_CATEGORIES_ERROR = "FETCH_CATEGORIES_ERROR",
  ADD_CATEGORY = "ADD_CATEGORY",
  START_ADD_CATEGORY = "START_ADD_CATEGORY",
  ADD_CATEGORY_ERROR = "ADD_CATEGORY_ERROR",
  REMOVE_CATEGORY = "REMOVE_CATEGORY",
  START_REMOVE_CATEGORY = "START_REMOVE_CATEGORY",
  REMOVE_CATEGORY_ERROR = "REMOVE_CATEGORY_ERROR",
  ADD_SUBCATEGORY = "ADD_SUBCATEGORY",
  START_ADD_SUBCATEGORY = "START_ADD_SUBCATEGORY",
  ADD_SUBCATEGORY_ERROR = "ADD_SUBCATEGORY_ERROR",
  REMOVE_SUBCATEGORY = "REMOVE_SUBCATEGORY",
  START_REMOVE_SUBCATEGORY = "START_REMOVE_SUBCATEGORY",
  REMOVE_SUBCATEGORY_ERROR = "REMOVE_SUBCATEGORY_ERROR",
  FETCH_POST = "FETCH_POST",
  START_FETCH_POST = "START_FETCH_POST",
  FETCH_POST_ERROR = "FETCH_POST_ERROR",
  ADD_POST = "ADD_POST",
  START_ADD_POST = "START_ADD_POST",
  ADD_POST_ERROR = "ADD_POST_ERROR",
  REMOVE_POST = "REMOVE_POST",
  START_REMOVE_POST = "START_REMOVE_POST",
  REMOVE_POST_ERROR = "REMOVE_POST_ERROR",
  UPDATE_POST = "UPDATE_POST",
  START_UPDATE_POST = "START_UPDATE_POST",
  UPDATE_POST_ERROR = "UPDATE_POST_ERROR",
}

export interface CategoryActionA {
  type: CategoryActionTypes.FETCH_CATEGORIES;
  payload: Category[];
}

export interface CategoryActionB {
  type: CategoryActionTypes.LOADING_CATEGORIES;
  payload: boolean;
}

export interface CategoryActionC {
  type: CategoryActionTypes.FETCH_CATEGORIES_ERROR;
  payload: string;
}

export interface CategoryActionD {
  type: CategoryActionTypes.ADD_CATEGORY;
  payload: Category;
}

export interface CategoryActionE {
  type: CategoryActionTypes.START_ADD_CATEGORY;
  payload: boolean;
}

export interface CategoryActionF {
  type: CategoryActionTypes.ADD_CATEGORY_ERROR;
  payload: string;
}

export interface CategoryActionG {
  type: CategoryActionTypes.REMOVE_CATEGORY;
  payload: string;
}

export interface CategoryActionH {
  type: CategoryActionTypes.START_REMOVE_CATEGORY;
  payload: boolean;
}

export interface CategoryActionI {
  type: CategoryActionTypes.REMOVE_CATEGORY_ERROR;
  payload: string;
}

export interface CategoryActionJ {
  type: CategoryActionTypes.ADD_SUBCATEGORY;
  payload: {
    categoryId: string;
    subCategory: SubCategory;
  };
}

export interface CategoryActionK {
  type: CategoryActionTypes.START_ADD_SUBCATEGORY;
  payload: boolean;
}

export interface CategoryActionL {
  type: CategoryActionTypes.ADD_SUBCATEGORY_ERROR;
  payload: string;
}

export interface CategoryActionM {
  type: CategoryActionTypes.REMOVE_SUBCATEGORY;
  payload: {
    categoryId: string;
    subCategoryId: string;
  };
}

export interface CategoryActionN {
  type: CategoryActionTypes.START_REMOVE_SUBCATEGORY;
  payload: boolean;
}

export interface CategoryActionO {
  type: CategoryActionTypes.REMOVE_SUBCATEGORY_ERROR;
  payload: string;
}

export interface CategoryActionP {
  type: CategoryActionTypes.FETCH_POST;
  payload: Post;
}

export interface CategoryActionQ {
  type: CategoryActionTypes.START_FETCH_POST;
  payload: boolean;
}

export interface CategoryActionR {
  type: CategoryActionTypes.FETCH_POST_ERROR;
  payload: string;
}

export interface CategoryActionS {
  type: CategoryActionTypes.ADD_POST;
  payload: {
    categoryId: string;
    subCategoryId: string;
    post: Post;
  };
}

export interface CategoryActionT {
  type: CategoryActionTypes.START_ADD_POST;
  payload: boolean;
}

export interface CategoryActionU {
  type: CategoryActionTypes.ADD_POST_ERROR;
  payload: string;
}

export interface CategoryActionV {
  type: CategoryActionTypes.REMOVE_POST;
  payload: {
    categoryId: string;
    subCategoryId: string;
    postId: string;
  };
}

export interface CategoryActionW {
  type: CategoryActionTypes.START_REMOVE_POST;
  payload: boolean;
}

export interface CategoryActionX {
  type: CategoryActionTypes.REMOVE_POST_ERROR;
  payload: string;
}

export interface CategoryActionY {
  type: CategoryActionTypes.UPDATE_POST;
  payload: {
    categoryId: string;
    subCategoryId: string;
    post: Post;
  };
}

export interface CategoryActionZ {
  type: CategoryActionTypes.START_UPDATE_POST;
  payload: boolean;
}

export interface CategoryActionAA {
  type: CategoryActionTypes.UPDATE_POST_ERROR;
  payload: string;
}

export type CategoryAction =
  | CategoryActionA
  | CategoryActionB
  | CategoryActionC
  | CategoryActionD
  | CategoryActionE
  | CategoryActionF
  | CategoryActionG
  | CategoryActionH
  | CategoryActionI
  | CategoryActionJ
  | CategoryActionK
  | CategoryActionL
  | CategoryActionM
  | CategoryActionN
  | CategoryActionO
  | CategoryActionP
  | CategoryActionQ
  | CategoryActionR
  | CategoryActionS
  | CategoryActionT
  | CategoryActionU
  | CategoryActionV
  | CategoryActionW
  | CategoryActionX
  | CategoryActionY
  | CategoryActionZ
  | CategoryActionAA;
