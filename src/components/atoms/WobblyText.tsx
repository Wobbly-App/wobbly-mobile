import * as React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { human } from 'react-native-typography';

import { colors } from '../../style/common';

const styles = StyleSheet.create({
  heading: {
    // fontFamily: 'montserrat-bold',
  },
  listHeading: {
    fontSize: 14,
    color: colors.gray2,
    marginHorizontal: 10,
  },
});

interface WobblyText extends TextProps {
  text?: string;
  largeTitle?: boolean;
  title1?: boolean;
  title2?: boolean;
  title3?: boolean;
  headline?: boolean;
  callout?: boolean;
  subhead?: boolean;
  listHeading?: boolean;
}

const WobblyText: React.FC<WobblyText> = ({
  largeTitle,
  title1,
  title2,
  title3,
  headline,
  callout,
  subhead,
  listHeading,
  children,
  style,
  ...rest
}) => {
  const isHeading = largeTitle || title1 || title2 || title3;
  return (
    <Text
      style={StyleSheet.flatten([
        human.body,
        largeTitle && human.largeTitle,
        title1 && human.title1,
        title2 && human.title2,
        title3 && human.title3,
        headline && human.headline,
        callout && human.callout,
        subhead && human.subhead,
        listHeading && styles.listHeading,
        isHeading && styles.heading,
        style && style,
      ])}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default WobblyText;
