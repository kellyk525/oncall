import { Action, ActionTypes, PostsState } from "shared/types/storeTypes";

export const getPostsDefaultState = () => {
  return {
    openUpdatePostModal: false,
    categoryId: null,
    subCategoryId: null,
    categories: [],
  };
};

export const postsReducer = (state: PostsState, action: Action): PostsState => {
  switch (action.type) {
    case ActionTypes.OPEN_UPDATE_POST_MODAL:
      return {
        ...state,
        openUpdatePostModal: true,
      };
    case ActionTypes.CLOSE_UPDATE_POST_MODAL:
      return {
        ...state,
        openUpdatePostModal: false,
      };
    case ActionTypes.SET_SELECTED_CATEGORY:
      return {
        ...state,
        categoryId: action.payload,
      };
    case ActionTypes.SET_SELECTED_SUB_CATEGORY:
      return {
        ...state,
        subCategoryId: action.payload,
      };
    case ActionTypes.FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case ActionTypes.DELETE_CATEGORY:
      const deletedCategoryId = action.payload;
      const filteredCategories = state.categories.filter(
        (category) => category._id != deletedCategoryId
      );
      return {
        ...state,
        categories: filteredCategories,
      };
    default:
      return getPostsDefaultState();
  }
};
