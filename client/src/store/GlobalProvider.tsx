import React, { useReducer } from "react";
import { authReducer, getAuthDefaultState } from "../reducers/authReducer";
import { GlobalContext } from "./globalContext";

// Types
import { ActionTypes } from "../shared/types/storeTypes";
import { User } from "../shared/types/appTypes";

const GlobalProvider: React.FC = () => {
  const [authData, authDispatchFn] = useReducer(
    authReducer,
    { userData: null },
    getAuthDefaultState
  );

  const signinUser = (type: ActionTypes.AUTH, payload: User) => {
    authDispatchFn({ type, payload });
  };

  const logoutUser = (type: ActionTypes.LOGOUT) => {
    authDispatchFn({ type });
  };

  const contextValue = {
    userData: authData.userData,
    signinUser,
    logoutUser,
  };

  return <GlobalContext.Provider value={contextValue}></GlobalContext.Provider>;
};

export default GlobalProvider;
