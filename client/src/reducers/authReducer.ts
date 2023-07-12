import { State, Action, ActionTypes } from "../shared/types/storeTypes";

export const getAuthDefaultState = () => {
  const loggedInUser = localStorage.getItem("profile");
  const parsedData = loggedInUser ? JSON.parse(loggedInUser).user : null;

  return {
    userData: parsedData,
  };
};

export const authReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));

      return {
        ...state,
        userData: action.payload.user,
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
