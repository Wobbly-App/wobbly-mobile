import React from 'react';
import { View, Text } from 'react-native';

interface DrawerListItemProps {
  title: string;
}
const DrawerListItem: React.FC<DrawerListItemProps> = ({ title }) => (
  <View>
    <Text>{title}</Text>
  </View>
);

export default DrawerListItem;
