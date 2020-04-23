import React from 'react';
import { View, StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    marginHorizontal: 5,
  },
});

const ScreenContainer: React.FC = ({ children }) => (
  <View style={style.container}>{children}</View>
);

export default ScreenContainer;
