import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    "auth/receivedCredentials": (
      state,
      action: PayloadAction<ICredentials>
    ) => ({ ...state, credentials: action.payload, isLoading: false }),
    "auth/clearedCredentials": state => ({
      ...state,
      credentials: undefined,
      isLoading: false
    })
  }
});

module.exports = actions;
export default reducer;
