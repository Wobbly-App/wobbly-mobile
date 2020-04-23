import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

import { Chat } from '../../redux/modules/chats';
import DrawerListItem from '../atoms/DrawerListItem';

const style = StyleSheet.create({
  sectionHeaderContainer: {
    backgroundColor: 'lightgrey',
  },
  sectionHeaderTitle: {
    textAlign: 'center',
  },
});

interface DrawerListSectionProps {
  title: string;
  chats: Chat[];
}
const DrawerListSection: React.FC<DrawerListSectionProps> = ({
  title,
  chats,
}) => (
  <>
    <ListItem
      title={title}
      bottomDivider={true}
      containerStyle={style.sectionHeaderContainer}
      titleStyle={style.sectionHeaderTitle}
    />
    {chats.map((chat) => (
      <DrawerListItem key={chat.id} chat={chat} />
    ))}
  </>
);

export default DrawerListSection;
