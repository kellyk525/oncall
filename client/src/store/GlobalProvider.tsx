import React, { useReducer } from "react";
import { GlobalContext } from "./globalContext";
import { authReducer, getAuthDefaultState } from "reducers/authReducer";
import { postsReducer, getPostsDefaultState } from "reducers/postsReducer";
import {
  categoryReducer,
  getCategoryDefaultState,
} from "reducers/categoryReducer";
import {
  fetchCategories,
  addCategory,
  removeCategory,
  addSubCategory,
  removeSubCategory,
} from "apis/categories";
import { fetchPost, addPost, removePost, updatePost } from "apis/posts";

// Types
import { ActionTypes } from "shared/types/storeTypes";
import { Post, User } from "shared/types/appTypes";

const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authData, authDispatchFn] = useReducer(
    authReducer,
    { userData: null },
    getAuthDefaultState
  );
  const [postsData, postsDispatchFn] = useReducer(
    postsReducer,
    { openUpdatePostModal: false, categoryId: null, subCategoryId: null },
    getPostsDefaultState
  );

  const [categoryData, categoryDispatchFn] = useReducer(
    categoryReducer,
    {
      post: null,
      categories: [],
      loadingCategories: false,
      fetchCategoriesError: null,
      addingCategory: false,
      addingCategoryError: null,
      removingCategory: false,
      removingCategoryError: null,
      addingSubCategory: false,
      addingSubCategoryError: null,
      removingSubCategory: false,
      removingSubCategoryError: null,
      fetchingPost: false,
      fetchingPostError: null,
      addingPost: false,
      addingPostError: null,
      removingPost: false,
      removingPostError: null,
      updatingPost: false,
      updatingPostError: null,
    },
    getCategoryDefaultState
  );

  const signinUser = (
    type: ActionTypes.AUTH,
    payload: { user: User; token: string }
  ) => {
    authDispatchFn({ type, payload });
  };

  const logoutUser = (type: ActionTypes.LOGOUT) => {
    authDispatchFn({ type });
  };

  const handleUpdatePostModal = (
    type:
      | ActionTypes.OPEN_UPDATE_POST_MODAL
      | ActionTypes.CLOSE_UPDATE_POST_MODAL
  ) => {
    postsDispatchFn({ type });
  };

  const handleCategorySelect = (catId: string) => {
    postsDispatchFn({
      type: ActionTypes.SET_SELECTED_CATEGORY,
      payload: catId,
    });
  };

  const handleSubCategorySelect = (subCatId: string) => {
    postsDispatchFn({
      type: ActionTypes.SET_SELECTED_SUB_CATEGORY,
      payload: subCatId,
    });
  };

  const handleFetchCategories = () => {
    fetchCategories(categoryDispatchFn);
  };

  const handleAddCategory = (category: string) => {
    addCategory(categoryDispatchFn, category);
  };

  const handleRemoveCategory = (categoryId: string) => {
    removeCategory(categoryDispatchFn, categoryId);
  };

  const handleAddSubCategory = (categoryId: string, subCategory: string) => {
    addSubCategory(categoryDispatchFn, categoryId, subCategory);
  };

  const handleRemoveSubCategory = (
    categoryId: string,
    subCategoryId: string
  ) => {
    removeSubCategory(categoryDispatchFn, categoryId, subCategoryId);
  };

  const handleFetchPost = (postId: string) => {
    fetchPost(categoryDispatchFn, postId);
  };

  const handleAddPost = (
    categoryId: string,
    subCategoryId: string,
    title: string,
    description: string,
    creatorId: string
  ) => {
    addPost(
      categoryDispatchFn,
      categoryId,
      subCategoryId,
      title,
      description,
      creatorId
    );
  };

  const handleRemovePost = (
    categoryId: string,
    subCategoryId: string,
    postId: string,
    creatorId: string
  ) => {
    removePost(
      categoryDispatchFn,
      categoryId,
      subCategoryId,
      postId,
      creatorId
    );
  };

  const handleUpdatePost = (post: Post, creatorId: string) => {
    updatePost(categoryDispatchFn, post, creatorId);
  };

  const contextValue = {
    userData: authData.userData,
    signinUser,
    logoutUser,
    openUpdatePostModal: postsData.openUpdatePostModal,
    handleUpdatePostModal,
    categoryId: postsData.categoryId,
    setCategoryId: handleCategorySelect,
    subCategoryId: postsData.subCategoryId,
    setSubCategoryId: handleSubCategorySelect,

    post: categoryData.post,
    categories: categoryData.categories,
    loadingCategories: categoryData.loadingCategories,
    fetchCategoriesError: categoryData.fetchCategoriesError,
    fetchCategories: handleFetchCategories,

    addingCategory: categoryData.addingCategory,
    addingCategoryError: categoryData.addingCategoryError,
    addCategory: handleAddCategory,

    removingCategory: categoryData.removingCategory,
    removingCategoryError: categoryData.removingCategoryError,
    removeCategory: handleRemoveCategory,

    addingSubCategory: categoryData.addingSubCategory,
    addingSubCategoryError: categoryData.addingSubCategoryError,
    addSubCategory: handleAddSubCategory,

    removingSubCategory: categoryData.removingSubCategory,
    removingSubCategoryError: categoryData.removingSubCategoryError,
    removeSubCategory: handleRemoveSubCategory,

    fetchingPost: categoryData.fetchingPost,
    fetchingPostError: categoryData.fetchingPostError,
    fetchPost: handleFetchPost,

    addingPost: categoryData.addingPost,
    addingPostError: categoryData.addingPostError,
    addPost: handleAddPost,

    removingPost: categoryData.removingPost,
    removingPostError: categoryData.removingPostError,
    removePost: handleRemovePost,

    updatingPost: categoryData.updatingPost,
    updatingPostError: categoryData.updatingPostError,
    updatePost: handleUpdatePost,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
