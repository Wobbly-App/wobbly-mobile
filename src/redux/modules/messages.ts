import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import WobblyClient from "../../common/WobblyClient";

interface IMessage {
  id: string;
  fromJid: string;
  toJid: string;
  text: string;
  timestamp: number;
  sent: boolean;
  // delivered: boolean;
  error: boolean;
}
interface IChatsState {
  byId: { [id: string]: IMessage };
  allIds: string[];
}
const initialState: IChatsState = {
  byId: {},
  allIds: []
};

const { actions, reducer } = createSlice({
  name: "messages",
  initialState,
  reducers: {
    "messages/messageAdded": (state, action: PayloadAction<IMessage>) => ({
      ...state,
      byId: { ...state.byId, [action.payload.id]: action.payload },
      allIds: [...state.allIds, action.payload.id]
    }),
    // Used e.g. for updating the state of a message from "sent = false" to "sent = true"
    "messages/messageUpdated": (state, action: PayloadAction<IMessage>) => ({
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
) => dispatch => {
  const message = {
    id: "TODO",
    fromJid: client.jid,
    toJid: recipientJid,
    text,
    timestamp: Date.now(),
    sent: false,
    error: false
  };
  actions["messages/messageAdded"](message);
  client
    .sendChat(recipientJid, text)
    .then(() => {
      actions["messages/messageUpdated"]({ ...message, sent: true });
    })
    .catch(() => {
      actions["messages/messageUpdated"]({ ...message, error: true });
    });
};

module.exports = actions;
export default reducer;
