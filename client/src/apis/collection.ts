import { Dispatch } from "react";
import {
  CollectionAction,
  CollectionActionTypes,
} from "shared/types/collectionTypes";
import { getUserSessionToken } from "shared/utils/userData";

const URL = "http://localhost:8000";

type RequestBody = {
  [key: string]: any;
};

class HTTPRequest {
  url: string;
  headers: Headers;
  error: string | null;
  body: RequestBody | null;
  method: string | undefined;

  constructor(url: string, method: string | null, body: RequestBody | null) {
    this.headers = new Headers();
    this.url = url;
    this.error = null;
    this.body = body;
    this.method = method === null ? "GET" : method;
  }

  setHeader = (headerKey: string, value: any) => {
    this.headers.append(headerKey, value);
  };

  sendRequest = async () => {
    let requestResponse = null;
    try {
      const response = await fetch(this.url, {
        method: this.method,
        headers: this.headers,
        body: this.body ? JSON.stringify(this.body) : null,
      });

      const jsonResponse = await response.json();
      if (!jsonResponse.success) {
        throw new Error(jsonResponse.message);
      }

      requestResponse = jsonResponse;
    } catch (e) {
      let error = e as Error;
      this.error = error.message ? error.message : "Unknown error";
      requestResponse = { success: false, message: this.error };
      console.log(this.error);
    }
    return requestResponse;
  };
}

export const fetchUserCollection = async (
  collectionDispatchFn: Dispatch<CollectionAction>,
  creatorId: string
) => {
  // Set up request
  const url = `${URL}/collections/${creatorId}`;
  const httpRequest = new HTTPRequest(url, null, null);
  httpRequest.setHeader("Content-Type", "application/json");
  httpRequest.setHeader("Authorization", `Bearer ${getUserSessionToken()}`);

  // Send request
  collectionDispatchFn({
    type: CollectionActionTypes.COLLECTION_LOADING,
    payload: true,
  });
  const jsonResponse = await httpRequest.sendRequest();
  if (jsonResponse.success) {
    collectionDispatchFn({
      type: CollectionActionTypes.FETCH_COLLECTION,
      payload: jsonResponse.data,
    });
  } else {
    collectionDispatchFn({
      type: CollectionActionTypes.LOADING_ERROR,
      payload: jsonResponse.message,
    });
  }
  collectionDispatchFn({
    type: CollectionActionTypes.COLLECTION_LOADING,
    payload: false,
  });
};

export const addPostToCollection = async (
  collectionDispatchFn: Dispatch<CollectionAction>,
  collectionId: string,
  postId: string,
  creatorId: string
) => {
  // Set up request
  const url = `${URL}/collections/${collectionId}/posts/${postId}`;
  const body = {
    creatorId,
  };
  const httpRequest = new HTTPRequest(url, "PATCH", body);
  httpRequest.setHeader("Content-Type", "application/json");
  httpRequest.setHeader("Authorization", `Bearer ${getUserSessionToken()}`);

  // Send request
  collectionDispatchFn({
    type: CollectionActionTypes.ADDING_NEW_POST,
    payload: true,
  });

  const jsonResponse = await httpRequest.sendRequest();
  if (jsonResponse.success) {
    collectionDispatchFn({
      type: CollectionActionTypes.ADD_POST_TO_COLLECTION,
      payload: {
        collectionId,
        post: jsonResponse.data,
      },
    });
  } else {
    collectionDispatchFn({
      type: CollectionActionTypes.NEW_POST_ERROR,
      payload: jsonResponse.message,
    });
  }

  collectionDispatchFn({
    type: CollectionActionTypes.ADDING_NEW_POST,
    payload: false,
  });
};

export const removePostFromCollection = async (
  collectionDispatchFn: Dispatch<CollectionAction>,
  collectionId: string,
  postId: string,
  creatorId: string
) => {
  // Set up request
  const url = `${URL}/collections/${collectionId}/posts/${postId}`;
  const body = {
    creatorId,
  };
  const httpRequest = new HTTPRequest(url, "DELETE", body);
  httpRequest.setHeader("Content-Type", "application/json");
  httpRequest.setHeader("Authorization", `Bearer ${getUserSessionToken()}`);

  // Send request
  collectionDispatchFn({
    type: CollectionActionTypes.START_REMOVING_POST,
    payload: true,
  });

  const jsonResponse = await httpRequest.sendRequest();
  if (jsonResponse.success) {
    collectionDispatchFn({
      type: CollectionActionTypes.REMOVE_POST_FROM_COLLECTION,
      payload: {
        collectionId: collectionId,
        postId: postId,
      },
    });
  } else {
    collectionDispatchFn({
      type: CollectionActionTypes.POST_REMOVE_ERROR,
      payload: jsonResponse.message,
    });
  }

  collectionDispatchFn({
    type: CollectionActionTypes.START_REMOVING_POST,
    payload: false,
  });
};

export const addCollection = async (
  collectionDispatchFn: Dispatch<CollectionAction>,
  title: string,
  creatorId: string
) => {
  const url = `${URL}/collections/new`;
  const body = {
    title,
    creatorId,
  };

  collectionDispatchFn({
    type: CollectionActionTypes.ADDING_NEW_COLLECTION,
    payload: true,
  });
  const httpRequest = new HTTPRequest(url, "POST", body);
  httpRequest.setHeader("Content-Type", "application/json");
  httpRequest.setHeader("Authorization", `Bearer ${getUserSessionToken()}`);
  const jsonResponse = await httpRequest.sendRequest();
  if (jsonResponse.success) {
    collectionDispatchFn({
      type: CollectionActionTypes.ADD_COLLECTION,
      payload: jsonResponse.data,
    });
  } else {
    collectionDispatchFn({
      type: CollectionActionTypes.NEW_COLLECTION_ERROR,
      payload: jsonResponse.message,
    });
  }

  collectionDispatchFn({
    type: CollectionActionTypes.ADDING_NEW_COLLECTION,
    payload: false,
  });
};

export const removeCollection = async (
  collectionDispatchFn: Dispatch<CollectionAction>,
  collectionId: string,
  creatorId: string
) => {
  // Set up request
  const url = `${URL}/collections/${collectionId}`;
  const body = {
    creatorId,
  };
  const httpRequest = new HTTPRequest(url, "DELETE", body);
  httpRequest.setHeader("Content-Type", "application/json");
  httpRequest.setHeader("Authorization", `Bearer ${getUserSessionToken()}`);

  // Send request
  collectionDispatchFn({
    type: CollectionActionTypes.START_DELETING_COLLECTION,
    payload: true,
  });
  const jsonResponse = await httpRequest.sendRequest();
  if (jsonResponse.success) {
    collectionDispatchFn({
      type: CollectionActionTypes.DELETE_COLLECTION,
      payload: collectionId,
    });
  } else {
    collectionDispatchFn({
      type: CollectionActionTypes.COLLECTION_DELETE_ERROR,
      payload: jsonResponse.message,
    });
  }

  collectionDispatchFn({
    type: CollectionActionTypes.START_DELETING_COLLECTION,
    payload: false,
  });
};
