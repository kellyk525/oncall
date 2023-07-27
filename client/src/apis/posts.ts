import { Dispatch } from "react";
import { HTTPRequest } from "./collection";
import { getUserSessionToken } from "shared/utils/userData";
import { Post } from "shared/types/appTypes";
import {
  CategoryAction,
  CategoryActionTypes,
} from "shared/types/categoryTypes";

const URL = "https://kellyoncall.onrender.com";

export const fetchPost = async (
  categoryDispatchFn: Dispatch<CategoryAction>,
  postId: string
) => {
  // Set up request
  const url = `${URL}/posts/${postId}`;
  const httpRequest = new HTTPRequest(url, null, null);
  httpRequest.setHeader("Content-Type", "application/json");

  // Send request
  categoryDispatchFn({
    type: CategoryActionTypes.START_FETCH_POST,
    payload: true,
  });
  const jsonResponse = await httpRequest.sendRequest();
  if (jsonResponse.success) {
    categoryDispatchFn({
      type: CategoryActionTypes.FETCH_POST,
      payload: jsonResponse.data,
    });
  } else {
    categoryDispatchFn({
      type: CategoryActionTypes.FETCH_POST_ERROR,
      payload: jsonResponse.message,
    });
  }
  categoryDispatchFn({
    type: CategoryActionTypes.START_FETCH_POST,
    payload: false,
  });
};

export const addPost = async (
  categoryDispatchFn: Dispatch<CategoryAction>,
  categoryId: string,
  subCategoryId: string,
  title: string,
  description: string,
  creatorId: string
) => {
  // Set up request
  const url = `${URL}/posts/add-post`;
  const body = {
    categoryId,
    subCategoryId,
    title,
    description,
    creatorId,
  };
  const httpRequest = new HTTPRequest(url, "POST", body);
  httpRequest.setHeader("Content-Type", "application/json");
  httpRequest.setHeader("Authorization", `Bearer ${getUserSessionToken()}`);

  // Send request
  categoryDispatchFn({
    type: CategoryActionTypes.START_ADD_POST,
    payload: true,
  });
  const jsonResponse = await httpRequest.sendRequest();
  if (jsonResponse.success) {
    categoryDispatchFn({
      type: CategoryActionTypes.ADD_POST,
      payload: {
        categoryId,
        subCategoryId,
        post: jsonResponse.data,
      },
    });
  } else {
    categoryDispatchFn({
      type: CategoryActionTypes.ADD_POST_ERROR,
      payload: jsonResponse.message,
    });
  }
  categoryDispatchFn({
    type: CategoryActionTypes.START_ADD_POST,
    payload: false,
  });
};

export const removePost = async (
  categoryDispatchFn: Dispatch<CategoryAction>,
  categoryId: string,
  subCategoryId: string,
  postId: string,
  creatorId: string
) => {
  // Set up request
  const url = `${URL}/posts/${postId}`;
  const body = {
    subCategoryId,
    categoryId,
    creatorId,
  };

  const httpRequest = new HTTPRequest(url, "DELETE", body);
  httpRequest.setHeader("Content-Type", "application/json");
  httpRequest.setHeader("Authorization", `Bearer ${getUserSessionToken()}`);

  // Send request
  categoryDispatchFn({
    type: CategoryActionTypes.START_REMOVE_POST,
    payload: true,
  });
  const jsonResponse = await httpRequest.sendRequest();
  if (jsonResponse.success) {
    categoryDispatchFn({
      type: CategoryActionTypes.REMOVE_POST,
      payload: {
        categoryId,
        subCategoryId,
        postId,
      },
    });
    categoryDispatchFn({
      type: CategoryActionTypes.START_REMOVE_POST,
      payload: false,
    });
    window.location.assign("https://kellyoncall.live");
  } else {
    categoryDispatchFn({
      type: CategoryActionTypes.REMOVE_POST_ERROR,
      payload: jsonResponse.message,
    });
    categoryDispatchFn({
      type: CategoryActionTypes.START_REMOVE_POST,
      payload: false,
    });
  }
};

export const updatePost = async (
  categoryDispatchFn: Dispatch<CategoryAction>,
  post: Post,
  creatorId: string
) => {
  // Set up request
  const url = `${URL}/posts/${post._id}`;
  const body = {
    post,
    creatorId,
  };
  const httpRequest = new HTTPRequest(url, "PATCH", body);
  httpRequest.setHeader("Content-Type", "application/json");
  httpRequest.setHeader("Authorization", `Bearer ${getUserSessionToken()}`);

  // Send request
  categoryDispatchFn({
    type: CategoryActionTypes.START_UPDATE_POST,
    payload: true,
  });
  const jsonResponse = await httpRequest.sendRequest();
  if (jsonResponse.success) {
    categoryDispatchFn({
      type: CategoryActionTypes.UPDATE_POST,
      payload: {
        categoryId: post.categoryId,
        subCategoryId: post.subCategoryId,
        post,
      },
    });
  } else {
    categoryDispatchFn({
      type: CategoryActionTypes.UPDATE_POST_ERROR,
      payload: jsonResponse.message,
    });
  }
  categoryDispatchFn({
    type: CategoryActionTypes.START_UPDATE_POST,
    payload: false,
  });
};
