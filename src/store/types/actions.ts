/*
  This document has been divided by action. We may be able to execute
  A lot of this programatically in the future, as it is very redundant.
  The pattern here is heavily inspired by the boilerplate shown in the
  video here: https://www.youtube.com/watch?v=dZZxegovK9Q
*/

import { IMessage, IGroup, IGroupList } from "./contracts";

// Chat
export const CHAT_SEND_MESSAGE = "CHAT_SEND_MESSAGE";
export const CHAT_SEND_MESSAGE_SUCCESS = "CHAT_SEND_MESSAGE_SUCCESS";
export const CHAT_SEND_MESSAGE_FAIL = "CHAT_SEND_MESSAGE_FAIL";
export const CHAT_DELETE_MESSAGE = "CHAT_DELETE_MESSAGE";
export const CHAT_DELETE_MESSAGE_SUCCESS = "CHAT_DELETE_MESSAGE_SUCCESS";
export const CHAT_DELETE_MESSAGE_FAIL = "CHAT_DELETE_MESSAGE_FAIL";

export interface ISendMessageAction {
  type: typeof CHAT_SEND_MESSAGE;
  payload: IMessage;
}

export interface IDeleteMessageAction {
  type: typeof CHAT_DELETE_MESSAGE;
  meta: {
    timestamp: number;
  };
}

// Session
export const SESSION_REGISTER = "SESSION_REGISTER";
export const SESSION_REGISTER_SUCCESS = "SESSION_REGISTER_SUCCESS";
export const SESSION_REGISTER_FAIL = "SESSION_REGISTER_FAIL";
export const SESSION_LOGIN = "SESSION_LOGIN";
export const SESSION_LOGIN_SUCCESS = "SESSION_LOGIN_SUCCESS";
export const SESSION_LOGIN_FAIL = "SESSION_LOGIN_FAIL";
export const SESSION_LOGOUT = "SESSION_LOGOUT";

export interface IRegisterAction {
  type: typeof SESSION_REGISTER;
  errorMessage?: string;
  email?: string;
}

export interface ILoginAction {
  type: typeof SESSION_LOGIN;
  token: string;
}

export interface ILogoutAction {
  type: typeof SESSION_LOGOUT;
}

// User

// Group
export const GROUP_CREATE = "GROUP_CREATE";
export const GROUP_CREATE_SUCCESS = "GROUP_CREATE_SUCCESS";
export const GROUP_CREATE_FAIL = "GROUP_CREATE_FAIL";
export const GROUP_GET_GROUPS = "GROUP_GET_GROUPS";
export const GROUP_GET_GROUPS_SUCCESS = "GROUP_GET_GROUPS_SUCCESS";
export const GROUP_GET_GROUPS_FAIL = "GROUP_GET_GROUPS_FAIL";

export interface ICreateGroupAction {
  type: typeof GROUP_CREATE;
  group: IGroup
}

export interface IGetGroupsAction {
  type: typeof GROUP_GET_GROUPS
  groups: IGroupList
}

export type ChatActionTypes = ISendMessageAction | IDeleteMessageAction;
export type SessionActionTypes = IRegisterAction | ILoginAction | ILogoutAction;
export type AppActions = SessionActionTypes | ChatActionTypes;
