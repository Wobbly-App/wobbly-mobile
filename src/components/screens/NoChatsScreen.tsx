import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Text, Button } from 'react-native';

import { MainStackParamList } from '../../app/Navigation';

type NavigationProp = StackNavigationProp<MainStackParamList, 'NoChats'>;
interface NoChatsScreenProps {
  navigation: NavigationProp;
}
const NoChatsScreen: React.FC<NoChatsScreenProps> = ({ navigation }) => {
  const navigate = () => {
    navigation.navigate('NewChat');
  };
  return (
    <>
      <Text>No chats</Text>
      <Button onPress={navigate} title="Start a chat" />
    </>
  );
};

export default NoChatsScreen;
