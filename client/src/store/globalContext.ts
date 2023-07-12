import React from "react";
import { User } from "../shared/types/appTypes";
import { ActionTypes } from "../shared/types/storeTypes";

export type GlobalContextObject = {
  userData: User | null;
  signinUser: (
    type: ActionTypes.AUTH,
    payload: { user: User; token: string }
  ) => void;
  logoutUser: (type: ActionTypes.LOGOUT) => void;
};

export const GlobalContext = React.createContext<GlobalContextObject>({
  userData: null,
  signinUser: (type, payload) => {},
  logoutUser: () => {},
});
