import * as React from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputContentSizeChangeEventData,
  TextInputProps,
  View,
} from 'react-native';
import { human } from 'react-native-typography';

import { colors } from '../../style/common';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.lightGray4,
    borderRadius: 10,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
    marginTop: 4,
    padding: 15,
  },
  textInput: {
    color: colors.black,
  },
});

export interface FormFieldProps extends TextInputProps {
  disabled?: boolean;
  multilineGrow?: boolean;
}
interface FormFieldState {
  height: number;
}
/**
 * A wrapper for `<TextInput>` with custom styling.
 */
class FormField extends React.PureComponent<FormFieldProps, FormFieldState> {
  public constructor(props: FormFieldProps) {
    super(props);
    this.state = { height: 0 };
  }

  public render() {
    const { disabled, multiline, multilineGrow, ...rest } = this.props;
    const multilineStartingHeight = 50;
    const startingHeight = multiline ? multilineStartingHeight : 20;
    return (
      <View style={styles.wrapper}>
        <TextInput
          editable={!disabled}
          style={[
            { height: Math.max(startingHeight, this.state.height) },
            human.body,
            styles.textInput,
          ]}
          placeholderTextColor={colors.gray1}
          onContentSizeChange={
            multilineGrow ? this.setContentFieldHeight : undefined
          }
          multiline={multiline}
          {...rest}
        />
      </View>
    );
  }

  private setContentFieldHeight = (
    event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>,
  ) => {
    this.setState({ height: event.nativeEvent.contentSize.height });
  };
}

export default FormField;
