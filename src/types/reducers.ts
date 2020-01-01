import { IGroupList } from "./contracts";

/*
    These types will define the state for each reducer in src/reducers.
    This will not always map 1:1 with actions, as actions and reducers
    are not designed to function in this way. Reducers are pure functions,
    and as such should only ever return a new instance of the same state type.
*/

export interface ISessionState {
  isLoggedIn: boolean;
  token: string | null;
}

export interface IGroupsState {
  groups: IGroupList | []
}
