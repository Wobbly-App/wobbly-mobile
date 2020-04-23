import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ListItem } from 'react-native-elements';

import { Chat } from '../../redux/modules/chats';

interface DrawerListItemProps {
  chat: Chat;
}
const DrawerListItem: React.FC<DrawerListItemProps> = ({ chat }) => {
  const navigation = useNavigation();
  const openChat = () => navigation.navigate('Chat', { chatId: chat.id });
  return (
    <ListItem
      title={chat.id}
      leftAvatar={{ rounded: true, icon: { type: 'feather', name: 'user' } }}
      onPress={openChat}
    ></ListItem>
  );
};

export default DrawerListItem;
