import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Text, Button, StyleSheet, View } from 'react-native';

import { MainStackParamList } from '../../app/Navigation';

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
  },
});

type NavigationProp = StackNavigationProp<MainStackParamList, 'NoChats'>;
interface NoChatsScreenProps {
  navigation: NavigationProp;
}
const NoChatsScreen: React.FC<NoChatsScreenProps> = ({ navigation }) => {
  const navigate = () => {
    navigation.push('NewChat');
  };
  return (
    <View style={style.wrapper}>
      <Text style={style.text}>No chats</Text>
      <Button onPress={navigate} title="Start a chat" />
    </View>
  );
};

export default NoChatsScreen;
