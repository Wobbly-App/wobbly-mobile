import React from 'react';
import { Text } from 'react-native';

interface DrawerListSectionHeaderProps {
  title: string;
}
const DrawerListSectionHeader: React.FC<DrawerListSectionHeaderProps> = ({
  title,
}) => <Text>{title}</Text>;

export default DrawerListSectionHeader;
