import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import WobblyClient from "../../common/WobblyClient";
import { IAppThunk } from "../store";

export interface IMessage {
  id: string;
  fromJid: string;
  toJid: string;
  text: string;
  timestamp: number;
  sent: boolean;
  // delivered: boolean;
  error: boolean;
}
interface IMessagesState {
  byId: { [id: string]: IMessage };
  allIds: string[];
}
const initialState: IMessagesState = {
  byId: {},
  allIds: []
};

const { actions, reducer } = createSlice({
  name: "messages",
  initialState,
  reducers: {
    messageAdded: (state, action: PayloadAction<IMessage>) => {
      console.log(action);
      return {
        ...state,
        byId: { ...state.byId, [action.payload.id]: action.payload },
        allIds: [...state.allIds, action.payload.id]
      };
    },
    // Used e.g. for updating the state of a message from "sent = false" to "sent = true"
    messageUpdated: (state, action: PayloadAction<IMessage>) => ({
      ...state,
      byId: { ...state.byId, [action.payload.id]: action.payload }
    })
  }
});

// Thunks
export const sendMessage = (
  client: WobblyClient,
  recipientJid: string,
  text: string
): IAppThunk => async dispatch => {
  const message: IMessage = {
    id: "TODO",
    fromJid: client.jid,
    toJid: recipientJid,
    text,
    timestamp: Date.now(),
    sent: false,
    error: false
  };
  dispatch(messageAdded(message));
  try {
    await client.sendChat(recipientJid, text);
    dispatch(messageUpdated({ ...message, sent: true }));
  } catch {
    dispatch(messageUpdated({ ...message, error: true }));
  }
};

export const { messageAdded, messageUpdated } = actions;
export default reducer;
