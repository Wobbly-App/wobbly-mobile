import * as React from 'react';
import { StyleSheet } from 'react-native';

import WobblyText from './WobblyText';

const style = StyleSheet.create({
  label: {
    marginLeft: 8,
    marginRight: 8,
  },
});

interface FormLabelProps {
  children: string;
}

const FormLabel = ({ children }: FormLabelProps) => (
  <WobblyText style={style.label} label={true}>
    {children}
  </WobblyText>
);

export default FormLabel;
