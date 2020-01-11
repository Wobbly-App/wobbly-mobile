import {
  SessionActionTypes,
  SESSION_REGISTER,
  SESSION_REGISTER_FAIL,
  SESSION_REGISTER_SUCCESS
} from "../types/actions";
import { ActionCreator } from "redux";
import { ThunkAction } from "thunk";
import axios from "axios";

export const registerUser = (email: string) => (
  dispatch
): Promise<SessionActionTypes> => {
  dispatch({ type: SESSION_REGISTER });
  return axios
    .post("/users", {
      email
    })
    .then(response => {
      return dispatch({
        type: SESSION_REGISTER_SUCCESS,
        email
      });
    })
    .catch(err => {
      if (err.message) {
        // TODO: RESEARCH TYPE-SAFE ERROR HANDLING PATTER FOR AXIOS/REDUX
        return dispatch({
          type: SESSION_REGISTER_FAIL,
          errorMessage: err.message
        });
      }
    });
};
