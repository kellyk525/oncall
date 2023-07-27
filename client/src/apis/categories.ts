import { Dispatch } from "react";
import { HTTPRequest } from "./collection";
import { getUserSessionToken } from "shared/utils/userData";
import {
  CategoryAction,
  CategoryActionTypes,
} from "shared/types/categoryTypes";

const URL = "https://kellyoncall.onrender.com";
export const fetchCategories = async (
  categoryDispatchFn: Dispatch<CategoryAction>
) => {
  // Set up request
  const url = `${URL}/categories`;
  const httpRequest = new HTTPRequest(url, null, null);
  httpRequest.setHeader("Content-Type", "application/json");

  // Send request
  categoryDispatchFn({
    type: CategoryActionTypes.LOADING_CATEGORIES,
    payload: true,
  });
  const jsonResponse = await httpRequest.sendRequest();
  if (jsonResponse.success) {
    categoryDispatchFn({
      type: CategoryActionTypes.FETCH_CATEGORIES,
      payload: jsonResponse.data,
    });
  } else {
    categoryDispatchFn({
      type: CategoryActionTypes.FETCH_CATEGORIES_ERROR,
      payload: jsonResponse.message,
    });
  }
  categoryDispatchFn({
    type: CategoryActionTypes.LOADING_CATEGORIES,
    payload: false,
  });
};

export const addCategory = async (
  categoryDispatchFn: Dispatch<CategoryAction>,
  category: string
) => {
  // Set up request
  const url = `${URL}/categories/add-category`;
  const body = {
    category,
  };
  const httpRequest = new HTTPRequest(url, "POST", body);
  httpRequest.setHeader("Content-Type", "application/json");
  httpRequest.setHeader("Authorization", `Bearer ${getUserSessionToken()}`);

  // Send request
  categoryDispatchFn({
    type: CategoryActionTypes.START_ADD_CATEGORY,
    payload: true,
  });
  const jsonResponse = await httpRequest.sendRequest();
  if (jsonResponse.success) {
    categoryDispatchFn({
      type: CategoryActionTypes.ADD_CATEGORY,
      payload: jsonResponse.data,
    });
  } else {
    categoryDispatchFn({
      type: CategoryActionTypes.ADD_CATEGORY_ERROR,
      payload: jsonResponse.message,
    });
  }
  categoryDispatchFn({
    type: CategoryActionTypes.START_ADD_CATEGORY,
    payload: false,
  });
};

export const removeCategory = async (
  categoryDispatchFn: Dispatch<CategoryAction>,
  categoryId: string
) => {
  // Set up request
  const url = `${URL}/categories/${categoryId}`;
  const httpRequest = new HTTPRequest(url, "DELETE", null);
  httpRequest.setHeader("Content-Type", "application/json");
  httpRequest.setHeader("Authorization", `Bearer ${getUserSessionToken()}`);

  // Send request
  categoryDispatchFn({
    type: CategoryActionTypes.START_REMOVE_CATEGORY,
    payload: true,
  });
  const jsonResponse = await httpRequest.sendRequest();
  if (jsonResponse.success) {
    categoryDispatchFn({
      type: CategoryActionTypes.REMOVE_CATEGORY,
      payload: categoryId,
    });
  } else {
    categoryDispatchFn({
      type: CategoryActionTypes.REMOVE_CATEGORY_ERROR,
      payload: jsonResponse.message,
    });
  }
  categoryDispatchFn({
    type: CategoryActionTypes.START_REMOVE_CATEGORY,
    payload: false,
  });
};

export const addSubCategory = async (
  categoryDispatchFn: Dispatch<CategoryAction>,
  categoryId: string,
  subCategory: string
) => {
  // Set up request
  const url = `${URL}/sub-categories/add-subcategory`;
  const body = {
    categoryId,
    subCategory,
  };
  const httpRequest = new HTTPRequest(url, "POST", body);
  httpRequest.setHeader("Content-Type", "application/json");
  httpRequest.setHeader("Authorization", `Bearer ${getUserSessionToken()}`);

  // Send request
  categoryDispatchFn({
    type: CategoryActionTypes.START_ADD_SUBCATEGORY,
    payload: true,
  });
  const jsonResponse = await httpRequest.sendRequest();
  if (jsonResponse.success) {
    categoryDispatchFn({
      type: CategoryActionTypes.ADD_SUBCATEGORY,
      payload: {
        categoryId,
        subCategory: jsonResponse.data,
      },
    });
  } else {
    categoryDispatchFn({
      type: CategoryActionTypes.ADD_SUBCATEGORY_ERROR,
      payload: jsonResponse.message,
    });
  }
  categoryDispatchFn({
    type: CategoryActionTypes.START_ADD_SUBCATEGORY,
    payload: false,
  });
};

export const removeSubCategory = async (
  categoryDispatchFn: Dispatch<CategoryAction>,
  categoryId: string,
  subCategoryId: string
) => {
  // Set up request
  const url = `${URL}/sub-categories/${subCategoryId}`;
  const body = {
    categoryId,
  };
  const httpRequest = new HTTPRequest(url, "DELETE", body);
  httpRequest.setHeader("Content-Type", "application/json");
  httpRequest.setHeader("Authorization", `Bearer ${getUserSessionToken()}`);

  // Send request
  categoryDispatchFn({
    type: CategoryActionTypes.START_REMOVE_SUBCATEGORY,
    payload: true,
  });
  const jsonResponse = await httpRequest.sendRequest();
  if (jsonResponse.success) {
    categoryDispatchFn({
      type: CategoryActionTypes.REMOVE_SUBCATEGORY,
      payload: {
        categoryId,
        subCategoryId,
      },
    });
  } else {
    categoryDispatchFn({
      type: CategoryActionTypes.REMOVE_SUBCATEGORY_ERROR,
      payload: jsonResponse.message,
    });
  }
  categoryDispatchFn({
    type: CategoryActionTypes.START_REMOVE_SUBCATEGORY,
    payload: false,
  });
};

export const signupUser = async () => {};

export const signinUser = async () => {};

export const logoutUser = async () => {};
