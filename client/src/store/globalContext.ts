import React from "react";
import { User } from "../shared/types/appTypes";
import { ActionTypes } from "../shared/types/storeTypes";

export type GlobalContextObject = {
  userData: User | null;
  signinUser: (type: ActionTypes.AUTH, payload: User) => void;
  logoutUser: (type: ActionTypes.LOGOUT) => void;
};

export const GlobalContext = React.createContext<GlobalContextObject>({
  userData: null,
  signinUser: () => {},
  logoutUser: () => {},
});
