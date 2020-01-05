/*
  This section currently has no server counterpart, so it is merely an example.
*/

import Axios from "axios";
import {
  ChatActionTypes,
  CHAT_DELETE_MESSAGE,
  IDeleteMessageAction,
  ISendMessageAction,
  CHAT_SEND_MESSAGE
} from "../types/actions";
import { IMessage } from "../types/contracts";

export async function sendMessage(
  newMessage: IMessage
): Promise<ISendMessageAction> {
  Axios.post("/chat/messages", newMessage);
  return {
    type: CHAT_SEND_MESSAGE,
    payload: newMessage
  };
}

export function deleteMessage(timestamp: number): ChatActionTypes {
  return {
    type: CHAT_DELETE_MESSAGE,
    meta: {
      timestamp
    }
  };
}
