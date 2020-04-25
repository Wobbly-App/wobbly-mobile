import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';

import { AppThunk } from '../store';

const SECURE_STORAGE_JID = 'jid';
const SECURE_STORAGE_PASSWORD = 'password';

interface Credentials {
  jid: string;
  password: string;
}
interface AuthState {
  credentials?: Credentials;
  clientReady: boolean;
  isLoadingAuth: boolean;
}
const initialState: AuthState = { isLoadingAuth: true, clientReady: false };
const { reducer, actions } = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    receivedCredentials: (state, action: PayloadAction<Credentials>) => ({
      ...state,
      credentials: action.payload,
      isLoadingAuth: false,
    }),
    clearedCredentials: (state) => ({
      ...state,
      credentials: undefined,
      clientReady: false,
      isLoadingAuth: false,
    }),
    clientWasInitialized: (state) => ({
      ...state,
      clientReady: true,
    }),
  },
});

export const {
  receivedCredentials,
  clearedCredentials,
  clientWasInitialized,
} = actions;
export default reducer;

// Thunks
export const loadCredentials = (): AppThunk => async (dispatch) => {
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

export const login = (jid: string, password: string): AppThunk => async (
  dispatch,
) => {
  try {
    await SecureStore.setItemAsync(SECURE_STORAGE_JID, jid);
    await SecureStore.setItemAsync(SECURE_STORAGE_PASSWORD, password);
    dispatch(receivedCredentials({ jid, password }));
  } catch {
    dispatch(clearedCredentials());
  }
};

export const logout = (): AppThunk => async (dispatch) => {
  try {
    await SecureStore.deleteItemAsync(SECURE_STORAGE_JID);
    await SecureStore.deleteItemAsync(SECURE_STORAGE_PASSWORD);
    dispatch(clearedCredentials());
  } catch {
    // TODO: handle logout failure
    throw new Error('Failed to log out!');
  }
};
