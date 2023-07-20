import React, { useReducer } from "react";
import { GlobalContext } from "./globalContext";
import { authReducer, getAuthDefaultState } from "reducers/authReducer";
import { postsReducer, getPostsDefaultState } from "reducers/postsReducer";

// Types
import { ActionTypes } from "shared/types/storeTypes";
import { Category, User } from "shared/types/appTypes";

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

  const fetchCategories = (categories: Category[]) => {
    postsDispatchFn({
      type: ActionTypes.FETCH_CATEGORIES,
      payload: categories,
    });
  };

  const deleteCategory = (categoryId: string) => {
    postsDispatchFn({
      type: ActionTypes.DELETE_CATEGORY,
      payload: categoryId,
    });
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
    categories: postsData.categories,
    fetchCategories,
    deleteCategory,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
