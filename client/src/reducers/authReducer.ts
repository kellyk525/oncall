import { State, Action, ActionTypes } from "../shared/types/storeTypes";

export const getAuthDefaultState = () => {
  return {
    userData: null,
  };
};

export const authReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.AUTH:
      const userData = action.payload;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));

      return {
        ...state,
        userData,
      };
    case ActionTypes.LOGOUT:
      localStorage.removeItem("profile");

      return {
        ...state,
        userData: null,
      };
    default:
      return getAuthDefaultState();
  }
};
