import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import * as Random from 'expo-random';
import { v4 as uuidv4 } from 'uuid';

import WobblyClient from '../../common/WobblyClient';
import { AppThunk } from '../store';

export interface MessageCore {
  id: string;
  fromJid: string;
  toJid: string;
  text: string;
}
interface MessageMetadata {
  timestamp: number;
  sent: boolean;
  // delivered: boolean;
  error: boolean;
}
export type Message = MessageCore & MessageMetadata;
interface MessageUpdate {
  id: string;
  data: Partial<MessageMetadata>;
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
    messageSent: (state, action: PayloadAction<MessageCore>) => {
      const message = {
        ...action.payload,
        timestamp: Date.now(),
        sent: false,
        error: false,
      };
      return {
        ...state,
        byId: { ...state.byId, [action.payload.id]: message },
        allIds: [action.payload.id, ...state.allIds],
      };
    },
    messageReceived: (state, action: PayloadAction<Message>) => ({
      ...state,
      byId: { ...state.byId, [action.payload.id]: action.payload },
      allIds: [action.payload.id, ...state.allIds],
    }),
    // Used e.g. for updating the state of a message from "sent = false" to "sent = true"
    messageUpdated: (state, action: PayloadAction<MessageUpdate>) => {
      const prevMessage = state.byId[action.payload.id];
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: { ...prevMessage, ...action.payload.data },
        },
      };
    },
  },
});

export const { messageSent, messageReceived, messageUpdated } = actions;

// Thunks
export const sendMessage = (
  client: WobblyClient,
  recipientJid: string,
  text: string,
): AppThunk => async (dispatch) => {
  const randomBytes = await Random.getRandomBytesAsync(16);
  const messageId = uuidv4({ random: randomBytes });
  const message: MessageCore = {
    id: messageId,
    fromJid: client.jid,
    toJid: recipientJid,
    text,
  };
  dispatch(messageSent(message));
  try {
    await client.sendChat(recipientJid, text);
    dispatch(messageUpdated({ id: messageId, data: { sent: true } }));
  } catch {
    dispatch(messageUpdated({ id: messageId, data: { error: true } }));
  }
};

export default reducer;
