import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { omit, has, uniq } from 'lodash';

import WobblyClient from '../../common/WobblyClient';
import { AppThunk } from '../store';

import { Message, messageAdded } from './messages';

export interface Chat {
  id: string;
  userIds: string[];
  messageIds: string[];
  isDirectMessage: boolean;
}
interface ChatsState {
  byId: { [id: string]: Chat };
  allIds: string[];
}
const initialState: ChatsState = {
  byId: {},
  allIds: [],
};
const { actions, reducer } = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    chatAdded: (state, action: PayloadAction<Chat>) => ({
      ...state,
      byId: { ...state.byId, [action.payload.id]: action.payload },
      allIds: uniq([action.payload.id, ...state.allIds]),
    }),
    chatRemoved: (state, action: PayloadAction<string>) => ({
      ...state,
      byId: omit(state.byId, action.payload),
      allIds: state.allIds.filter(id => id !== action.payload),
    }),
  },
  extraReducers: {
    [messageAdded.type]: (state, action: PayloadAction<Message>) => {
      const chatId = action.payload.fromJid;
      // TODO: handle userIds properly here
      // TODO: add userId of sender if not already included?
      // TODO: handle `isDirectMessage = false` for group chats
      const isNewChat = !has(state.byId, chatId);
      const prevChat = isNewChat
        ? {
            id: chatId,
            userIds: [chatId],
            messageIds: [],
            isDirectMessage: true,
          }
        : state.byId[chatId];
      return {
        ...state,
        byId: {
          ...state.byId,
          [chatId]: {
            ...prevChat,
            messageIds: [action.payload.id, ...prevChat.messageIds],
          },
        },
        allIds: isNewChat ? [chatId, ...state.allIds] : state.allIds,
      };
    },
  },
});

export const { chatAdded, chatRemoved } = actions;
export default reducer;

export const createChat = (
  client: WobblyClient,
  recipient: string,
): AppThunk => dispatch => {
  const jid = client.jid;
  const chat: Chat = {
    id: recipient,
    userIds: [jid, recipient],
    messageIds: [],
    isDirectMessage: true,
  };
  dispatch(chatAdded(chat));
};
