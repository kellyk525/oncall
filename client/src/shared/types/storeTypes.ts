import { User } from "./appTypes";

export type State = {
  userData: User | null;
};

export enum ActionTypes {
  AUTH = "AUTH",
  LOGOUT = "LOGOUT",
}

export interface ActionA {
  type: ActionTypes.AUTH;
  payload: {
    user: User;
    token: string;
  };
}

export interface ActionB {
  type: ActionTypes.LOGOUT;
}

export type Action = ActionA | ActionB;
