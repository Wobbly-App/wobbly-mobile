import { IGroupsState } from "../types/reducers";

const INITIAL_STATE: IGroupsState = {
  groups: []
};

export default function(action, state: IGroupsState = INITIAL_STATE) {
  try {
    switch (action.type) {
      default:
        return state;
    }
  } catch (err) {
    return state;
  }
}
