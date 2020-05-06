import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Text, Button, StyleSheet, View } from 'react-native';

import { MainStackParamList } from '../../app/Navigation';
import { WobblyText, WobblyButton } from '../atoms';
import { Intent } from '../atoms/WobblyButton';

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
      <WobblyText title1={true}>No chats</WobblyText>
      <WobblyButton
        onPress={navigate}
        text="Start a chat"
        intent={Intent.PRIMARY}
      />
    </View>
  );
};

export default NoChatsScreen;
