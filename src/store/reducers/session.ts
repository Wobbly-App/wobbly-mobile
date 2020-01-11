import { ISessionState } from "../types/reducers";

const INITIAL_STATE: ISessionState = {
  isLoggedIn: false,
  token: null
};

export default function(action, state: ISessionState = INITIAL_STATE) {
  try {
    switch (action.type) {
      default:
        return state;
    }
  } catch (err) {
    return state;
  }
}
