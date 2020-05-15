import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';

import WobblyClient from '../../common/WobblyClient';
import { AppThunk } from '../store';

const SECURE_STORAGE_DOMAIN = 'credentials/domain';
const SECURE_STORAGE_ACCESS_TOKEN = 'credentials/access_token';
const SECURE_STORAGE_REFRESH_TOKEN = 'credentials/refresh_token';

export interface Credentials {
  domain: string;
  accessToken: string;
  refreshToken: string;
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
    const domain = await SecureStore.getItemAsync(SECURE_STORAGE_DOMAIN);
    const accessToken = await SecureStore.getItemAsync(
      SECURE_STORAGE_ACCESS_TOKEN,
    );
    const refreshToken = await SecureStore.getItemAsync(
      SECURE_STORAGE_REFRESH_TOKEN,
    );
    if (!domain || !accessToken || !refreshToken) {
      throw new Error();
    }
    dispatch(receivedCredentials({ domain, accessToken, refreshToken }));
  } catch {
    // No credentials found
    dispatch(clearedCredentials());
  }
};

export const login = (
  domain: string,
  email: string,
  password: string,
): AppThunk => (dispatch) => {
  WobblyClient.login(domain, email, password)
    .then((json) => {
      const accessToken = json.data.access_token;
      const refreshToken = json.data.refresh_token;
      dispatch(receivedCredentials({ domain, accessToken, refreshToken }));
    })
    .catch(() => {
      dispatch(clearedCredentials());
    });
};

export const signup = (
  domain: string,
  email: string,
  password: string,
): AppThunk => (dispatch) => {
  WobblyClient.signup(domain, email, password)
    .then((json) => {
      const accessToken = json.data.access_token;
      const refreshToken = json.data.refresh_token;
      dispatch(receivedCredentials({ domain, accessToken, refreshToken }));
    })
    .catch(() => {
      dispatch(clearedCredentials());
    });
};

export const logout = (): AppThunk => async (dispatch) => {
  try {
    await SecureStore.deleteItemAsync(SECURE_STORAGE_DOMAIN);
    await SecureStore.deleteItemAsync(SECURE_STORAGE_ACCESS_TOKEN);
    await SecureStore.deleteItemAsync(SECURE_STORAGE_REFRESH_TOKEN);
    dispatch(clearedCredentials());
  } catch {
    // TODO: handle logout failure
    throw new Error('Failed to log out!');
  }
};
