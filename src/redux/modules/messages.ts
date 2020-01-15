import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import WobblyClient from '../../common/WobblyClient';
import { IAppThunk } from '../store';

export interface Message {
  id: string;
  fromJid: string;
  toJid: string;
  text: string;
  timestamp: number;
  sent: boolean;
  // delivered: boolean;
  error: boolean;
}
interface MessagesState {
  byId: { [id: string]: Message };
  allIds: string[];
}
const initialState: MessagesState = {
  byId: {},
  allIds: [],
};

const { actions, reducer } = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    messageAdded: (state, action: PayloadAction<Message>) => ({
      ...state,
      byId: { ...state.byId, [action.payload.id]: action.payload },
      allIds: [action.payload.id, ...state.allIds],
    }),
    // Used e.g. for updating the state of a message from "sent = false" to "sent = true"
    messageUpdated: (state, action: PayloadAction<Message>) => ({
      ...state,
      byId: { ...state.byId, [action.payload.id]: action.payload },
    }),
  },
});

export const { messageAdded, messageUpdated } = actions;

// Thunks
export const sendMessage = (
  client: WobblyClient,
  recipientJid: string,
  text: string,
): IAppThunk => async dispatch => {
  const message: Message = {
    id: 'TODO',
    fromJid: client.jid,
    toJid: recipientJid,
    text,
    timestamp: Date.now(),
    sent: false,
    error: false,
  };
  dispatch(messageAdded(message));
  try {
    await client.sendChat(recipientJid, text);
    dispatch(messageUpdated({ ...message, sent: true }));
  } catch {
    dispatch(messageUpdated({ ...message, error: true }));
  }
};

export default reducer;
