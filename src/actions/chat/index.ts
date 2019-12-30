import Axios from "axios";

import {
  ChatActionTypes,
  DELETE_MESSAGE,
  IMessage,
  SEND_MESSAGE
} from "./types";

export async function sendMessage(newMessage: IMessage): Promise<ChatActionTypes> {
  Axios
    .post()
  return {
    type: SEND_MESSAGE,
    payload: newMessage
  };
}

export function deleteMessage(timestamp: number): ChatActionTypes {
  return {
    type: DELETE_MESSAGE,
    meta: {
      timestamp
    }
  }
}
