import {
  DrawerContentScrollView,
  DrawerContentOptions,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { createSelector } from '@reduxjs/toolkit';
import { groupBy } from 'lodash';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { Chat } from '../../redux/modules/chats';
import { RootState } from '../../redux/rootReducer';
import DrawerListSection from '../molecules/DrawerListSection';
import LogoutButton from '../molecules/LogoutButton';

// Performance could be improved by just getting chat IDs and passing
// them to DrawerListItems that then fetch chat data from redux, but then
// we couldn't group DMs and group chats separately
// (and this would be a negligible perf impact unless someone is in a *lot*
// of groups).
const chatsByIdSelector = (state: RootState) => state.chats.byId;
const chatIdsSelector = (state: RootState) => state.chats.allIds;
const chatsSelector = createSelector(
  [chatsByIdSelector, chatIdsSelector],
  (byId, allIds) => {
    const chats = allIds.map((id) => byId[id]);
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
type WobblyDrawerProps = ConnectedProps<typeof connector> &
  DrawerContentComponentProps<DrawerContentOptions>;

const WobblyDrawer: React.FC<WobblyDrawerProps> = ({
  chatSections,
  ...rest
}) => (
  <DrawerContentScrollView {...rest}>
    {chatSections.map(({ title, data }) => (
      <DrawerListSection key={title} title={title} chats={data} />
    ))}
    <LogoutButton />
  </DrawerContentScrollView>
);

export default connector(WobblyDrawer);
