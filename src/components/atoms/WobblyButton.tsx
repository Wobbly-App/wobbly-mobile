import * as React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';

import { colors } from '../../style/common';

import WobblyText from './WobblyText';

const style = StyleSheet.create({
  button: {
    margin: 8,
    padding: 8,
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  default: {
    borderWidth: 1,
    borderColor: colors.gray4,
  },
  minimal: {},
  minimalText: {
    color: colors.gray3,
    fontFamily: 'open-sans-bold',
    fontSize: 15,
  },
  primary: {
    backgroundColor: colors.blue4,
  },
  success: {
    backgroundColor: colors.green4,
  },
  warning: {
    backgroundColor: colors.orange4,
  },
  danger: {
    backgroundColor: colors.red4,
  },
  disabled: {
    backgroundColor: colors.lightGray1,
  },
  disabledText: {
    color: colors.gray2,
  },
  buttonText: {
    color: colors.black,
    fontFamily: 'open-sans-bold',
    fontSize: 17,
    textAlign: 'center',
  },
  whiteText: {
    color: colors.white,
  },
});

export enum Intent {
  PRIMARY = 'PRIMARY',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  DANGER = 'DANGER',
}

interface WobblyButtonProps {
  text: string;
  isLoading?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  intent?: Intent;
  minimal?: boolean;
}
/** The default RN button doesn't offer much customization so we use our own. */
const WobblyButton = ({
  text,
  isLoading,
  intent,
  onPress,
  disabled,
  minimal,
}: WobblyButtonProps) => {
  text = minimal ? text.toUpperCase() : text;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        style.button,
        minimal && style.minimal,
        !intent && !minimal && style.default,
        intent === Intent.PRIMARY && style.primary,
        intent === Intent.SUCCESS && style.success,
        intent === Intent.WARNING && style.warning,
        intent === Intent.DANGER && style.danger,
        disabled && style.disabled,
      ]}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <WobblyText
          style={[
            style.buttonText,
            minimal && style.minimalText,
            intent && !minimal && style.whiteText,
            disabled && style.disabledText,
          ]}
        >
          {text}
        </WobblyText>
      )}
    </TouchableOpacity>
  );
};
export default WobblyButton;
