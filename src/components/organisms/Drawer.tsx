import { createSelector } from '@reduxjs/toolkit';
import { groupBy } from 'lodash';
import React from 'react';
import { SectionList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect, ConnectedProps } from 'react-redux';

import { Chat } from '../../redux/modules/chats';
import { RootState } from '../../redux/rootReducer';
import DrawerListItem from '../molecules/DrawerListItem';
import DrawerListSectionHeader from '../molecules/DrawerListSectionHeader';

// Performance could be improved by just getting chat IDs and passing
// them to DrawerListItems that then fetch chat data from redux, but then
// we couldn't use the SectionList
// (and this would be a negligible perf impact unless someone is in a *lot*
// of groups).
const chatsByIdSelector = (state: RootState) => state.chats.byId;
const chatIdsSelector = (state: RootState) => state.chats.allIds;
const chatsSelector = createSelector(
  [chatsByIdSelector, chatIdsSelector],
  (byId, allIds) => {
    const chats = allIds.map(id => byId[id]);
    const { true: directMessages, false: groups } = groupBy(
      chats,
      (c: Chat) => c.isDirectMessage,
    );
    return [
      {
        title: 'Groups',
        data: groups || [],
      },
      {
        title: 'Direct messages',
        data: directMessages || [],
      },
    ];
  },
);
const mapState = (state: RootState) => ({
  chatSections: chatsSelector(state),
});
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

const keyExtractor = (chat: Chat, index: number) => chat.id + index;
const renderItem = ({ item }: { item: Chat }) => (
  <DrawerListItem title={item.id} />
);
const renderSectionHeader = ({ section: { title } }) => (
  <DrawerListSectionHeader title={title} />
);
const Drawer: React.FC<PropsFromRedux> = ({ chatSections }) => {
  const isEmpty = !chatSections.every(c => !c.data);
  if (isEmpty) {
    return <ActivityIndicator />;
  }
  return (
    <SafeAreaView>
      <SectionList
        sections={chatSections}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader as any}
      />
    </SafeAreaView>
  );
};

export default connector(Drawer);
