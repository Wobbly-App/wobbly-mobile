import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import { IAppThunk } from "../store";

const SECURE_STORAGE_JID = "jid";
const SECURE_STORAGE_PASSWORD = "password";

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
    clearedCredentials: state => ({
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
    dispatch(clearedCredentials());
  }
};

export const login = (
  jid: string,
  password: string
): IAppThunk => async dispatch => {
  try {
    await SecureStore.setItemAsync(SECURE_STORAGE_JID, jid);
    await SecureStore.setItemAsync(SECURE_STORAGE_PASSWORD, password);
    dispatch(receivedCredentials({ jid, password }));
  } catch {
    dispatch(clearedCredentials());
  }
};

export const logout = (): IAppThunk => async dispatch => {
  try {
    await SecureStore.deleteItemAsync(SECURE_STORAGE_JID);
    await SecureStore.deleteItemAsync(SECURE_STORAGE_PASSWORD);
    dispatch(clearedCredentials());
  } catch {
    // TODO: handle logout failure
  }
};

export const { receivedCredentials, clearedCredentials } = actions;
export default reducer;
