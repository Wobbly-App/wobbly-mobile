import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import SecureStore from "expo-secure-store";
import { IAppThunk } from "../store";
import {
  SECURE_STORAGE_JID,
  SECURE_STORAGE_PASSWORD
} from "../../common/constants";

interface ICredentials {
  jid: string;
  password: string;
}
interface IAuthState {
  credentials?: ICredentials;
  isLoading: boolean;
}
const initialState: IAuthState = { isLoading: true };
const { reducer, actions } = createSlice({
  name: "auth",
  initialState,
  reducers: {
    receivedCredentials: (state, action: PayloadAction<ICredentials>) => ({
      ...state,
      credentials: action.payload,
      isLoading: false
    }),
    emptyCredentials: state => ({
      ...state,
      credentials: undefined,
      isLoading: false
    })
  }
});

// Thunks
export const loadCredentials = (): IAppThunk => async dispatch => {
  try {
    const jid = await SecureStore.getItemAsync(SECURE_STORAGE_JID);
    const password = await SecureStore.getItemAsync(SECURE_STORAGE_PASSWORD);
    if (!jid || !password) {
      throw new Error();
    }
    dispatch(receivedCredentials({ jid, password }));
  } catch {
    // No credentials found
    dispatch(emptyCredentials());
  }
};

export const saveCredentials = (
  jid: string,
  password: string
): IAppThunk => async dispatch => {
  console.log("auth: sc");
  try {
    console.log("auth: saving jid");
    await SecureStore.setItemAsync(SECURE_STORAGE_JID, jid);
    console.log("auth: saving pass");
    await SecureStore.setItemAsync(SECURE_STORAGE_PASSWORD, password);
    console.log("auth: dispatching success");
    dispatch(receivedCredentials({ jid, password }));
  } catch {
    console.log("auth: dispatching failure");
    dispatch(emptyCredentials());
  }
};

export const { receivedCredentials, emptyCredentials } = actions;
export default reducer;
