import {
  CollectionAction,
  CollectionState,
  CollectionActionTypes,
} from "shared/types/collectionTypes";

export const getCollectionDefaultState = (): CollectionState => {
  return {
    collection: [],
    isCollectionLoading: false,
    fetchCollectionError: null,
    addingNewPost: false,
    newPostError: null,
    addingNewCollection: false,
    newCollectionError: null,
    removingPost: false,
    removingPostError: null,
    removingCollection: false,
    removingCollectionError: null,
  };
};

export const collectionReducer = (
  state: CollectionState,
  action: CollectionAction
) => {
  switch (action.type) {
    case CollectionActionTypes.FETCH_COLLECTION:
      return {
        ...state,
        collection: action.payload,
      };
    case CollectionActionTypes.COLLECTION_LOADING:
      return {
        ...state,
        isCollectionLoading: action.payload,
      };
    case CollectionActionTypes.LOADING_ERROR:
      return {
        ...state,
        fetchCollectionError: action.payload,
      };
    case CollectionActionTypes.ADD_COLLECTION:
      const newCollection = [...state.collection, action.payload];
      return {
        ...state,
        collection: newCollection,
      };
    case CollectionActionTypes.ADDING_NEW_COLLECTION:
      return {
        ...state,
        addingNewCollection: action.payload,
      };
    case CollectionActionTypes.NEW_COLLECTION_ERROR:
      return {
        ...state,
        newCollectionError: action.payload,
      };
    case CollectionActionTypes.ADDING_NEW_POST:
      return {
        ...state,
        addingNewPost: action.payload as boolean,
      };
    case CollectionActionTypes.NEW_POST_ERROR:
      return {
        ...state,
        newPostError: action.payload,
      };
    case CollectionActionTypes.ADD_POST_TO_COLLECTION:
      const updatedCollection = state.collection.map((item) => {
        if (item._id === action.payload.collectionId) {
          item.posts = [...item.posts, action.payload.post];
        }
        return item;
      });
      return {
        ...state,
        collection: updatedCollection,
      };
    case CollectionActionTypes.REMOVE_POST_FROM_COLLECTION:
      const filteredPostFromCollection = state.collection.map((item) => {
        if (item._id === action.payload.collectionId) {
          item.posts = item.posts.filter(
            (post) => post._id !== action.payload.postId
          );
        }
        return item;
      });

      return {
        ...state,
        collection: filteredPostFromCollection,
      };
    case CollectionActionTypes.START_REMOVING_POST:
      return {
        ...state,
        removingPost: action.payload,
      };
    case CollectionActionTypes.POST_REMOVE_ERROR:
      return {
        ...state,
        removingPostError: action.payload,
      };
    case CollectionActionTypes.DELETE_COLLECTION:
      const filteredCollection = state.collection.filter(
        (item) => item._id !== action.payload
      );

      return {
        ...state,
        collection: filteredCollection,
      };
    case CollectionActionTypes.START_DELETING_COLLECTION:
      return {
        ...state,
        removingCollection: action.payload,
      };
    case CollectionActionTypes.COLLECTION_DELETE_ERROR:
      return {
        ...state,
        removingCollectionError: action.payload,
      };
    default:
      return getCollectionDefaultState();
  }
};
