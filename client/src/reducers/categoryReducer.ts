import {
  CategoryAction,
  CategoryState,
  CategoryActionTypes,
} from "shared/types/categoryTypes";

export const getCategoryDefaultState = (): CategoryState => {
  return {
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
  };
};

export const categoryReducer = (
  state: CategoryState,
  action: CategoryAction
) => {
  switch (action.type) {
    case CategoryActionTypes.FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case CategoryActionTypes.LOADING_CATEGORIES:
      return {
        ...state,
        loadingCategories: action.payload,
      };
    case CategoryActionTypes.FETCH_CATEGORIES_ERROR:
      return {
        ...state,
        fetchCategoriesError: action.payload,
      };
    case CategoryActionTypes.ADD_CATEGORY:
      const updatedCategories = [...state.categories, action.payload];
      return {
        ...state,
        categories: updatedCategories,
      };
    case CategoryActionTypes.START_ADD_CATEGORY:
      return {
        ...state,
        addingCategory: action.payload,
      };
    case CategoryActionTypes.ADD_CATEGORY_ERROR:
      return {
        ...state,
        addingCategoryError: action.payload,
      };
    case CategoryActionTypes.REMOVE_CATEGORY:
      const removedCategoryId = action.payload;
      const filteredCategories = state.categories.filter(
        (category) => category._id !== removedCategoryId
      );
      return {
        ...state,
        categories: filteredCategories,
      };
    case CategoryActionTypes.START_REMOVE_CATEGORY:
      return {
        ...state,
        removingCategory: action.payload,
      };
    case CategoryActionTypes.REMOVE_CATEGORY_ERROR:
      return {
        ...state,
        removingCategoryError: action.payload,
      };
    case CategoryActionTypes.ADD_SUBCATEGORY:
      const categoryId = action.payload.categoryId;
      const newSubCategory = action.payload.subCategory;

      const updatedSubCategory = state.categories.map((category) => {
        if (category._id === categoryId) {
          const existingSubCategory =
            category.subCategories.findIndex(
              (subCat) => subCat._id === newSubCategory._id
            ) > -1;
          if (existingSubCategory) {
            return category;
          }
          category.subCategories = [...category.subCategories, newSubCategory];
        }

        return category;
      });

      return Object.assign({}, state, {
        categories: updatedSubCategory,
      });
    case CategoryActionTypes.START_ADD_SUBCATEGORY:
      return {
        ...state,
        addingSubCategory: action.payload,
      };
    case CategoryActionTypes.ADD_SUBCATEGORY_ERROR:
      return {
        ...state,
        addingSubCategoryError: action.payload,
      };
    case CategoryActionTypes.REMOVE_SUBCATEGORY:
      const removedSubCategoryId = action.payload.subCategoryId;
      const updateCategories = state.categories.map((category) => {
        if (category._id === action.payload.categoryId) {
          category.subCategories = category.subCategories.filter(
            (subCat) => subCat._id !== removedSubCategoryId
          );
        }

        return category;
      });
      return {
        ...state,
        categories: updateCategories,
      };
    case CategoryActionTypes.START_REMOVE_SUBCATEGORY:
      return {
        ...state,
        removingSubCategory: action.payload,
      };
    case CategoryActionTypes.REMOVE_SUBCATEGORY_ERROR:
      return {
        ...state,
        removingSubCategoryError: action.payload,
      };
    case CategoryActionTypes.FETCH_POST:
      return {
        ...state,
        post: action.payload,
      };
    case CategoryActionTypes.START_FETCH_POST:
      return {
        ...state,
        fetchingPost: action.payload,
      };
    case CategoryActionTypes.FETCH_POST_ERROR:
      return {
        ...state,
        fetchingPostError: action.payload,
      };
    case CategoryActionTypes.ADD_POST:
      const newPostResponse = action.payload.post;
      const categoriesWithNewPost = state.categories.map((category) => {
        if (category._id === newPostResponse.categoryId) {
          category.subCategories.map((subCat) => {
            if (subCat._id === newPostResponse.subCategoryId) {
              subCat.posts = [...subCat.posts, newPostResponse];
            }
            return subCat;
          });
        }
        return category;
      });

      return {
        ...state,
        categories: categoriesWithNewPost,
      };
    case CategoryActionTypes.START_ADD_POST:
      return {
        ...state,
        addingPost: action.payload,
      };
    case CategoryActionTypes.ADD_POST_ERROR:
      return {
        ...state,
        addingPostError: action.payload,
      };
    case CategoryActionTypes.REMOVE_POST:
      const removedPostId = action.payload.postId;
      const filterPostFromCategories = state.categories.map((category) => {
        if (category._id === action.payload.categoryId) {
          category.subCategories.map((subCat) => {
            if (subCat._id === action.payload.subCategoryId) {
              subCat.posts = subCat.posts.filter(
                (post) => post._id !== removedPostId
              );
            }
            return subCat;
          });
        }
        return category;
      });
      return {
        ...state,
        categories: filterPostFromCategories,
      };
    case CategoryActionTypes.START_REMOVE_POST:
      return {
        ...state,
        removingPost: action.payload,
      };
    case CategoryActionTypes.REMOVE_POST_ERROR:
      return {
        ...state,
        removingPostError: action.payload,
      };
    case CategoryActionTypes.UPDATE_POST:
      const updatedPostId = action.payload.post._id;
      const newPost = action.payload.post;

      const categoriesWithUpdatedPost = state.categories.map((category) => {
        if (category._id === action.payload.categoryId) {
          category.subCategories.map((subCat) => {
            if (subCat._id === action.payload.subCategoryId) {
              subCat.posts = subCat.posts.map((post) => {
                if (post._id === updatedPostId) {
                  return newPost;
                }
                return post;
              });
            }
            return subCat;
          });
        }
        return category;
      });

      return {
        ...state,
        categories: categoriesWithUpdatedPost,
        post: newPost,
      };
    case CategoryActionTypes.START_UPDATE_POST:
      return {
        ...state,
        updatingPost: action.payload,
      };
    case CategoryActionTypes.UPDATE_POST_ERROR:
      return {
        ...state,
        updatingPostError: action.payload,
      };
    default:
      return getCategoryDefaultState();
  }
};
