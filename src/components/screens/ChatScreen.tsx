import React from "react";
import { Text, FlatList } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import { IRootState } from "../../redux/rootReducer";
import { createSelector } from "@reduxjs/toolkit";

const messageIdsSelector = (state: IRootState) => state.messages.allIds;
const messagesByIdSelector = (state: IRootState) => state.messages.byId;
const allMessagesSelector = createSelector(
  [messageIdsSelector, messagesByIdSelector],
  (allIds, byId) => allIds.map((id: string) => byId[id])
);
const mapState = (state: IRootState) => ({
  messages: allMessagesSelector(state)
});
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

const ChatScreen: React.FC<PropsFromRedux> = ({ messages }) => (
  <>
    {messages.map(msg => (
      <Text>{msg.text}</Text>
    ))}
  </>
);

export default connector(ChatScreen);
