import { Formik, FormikProps } from 'formik';
import React from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import { ConnectedProps, connect } from 'react-redux';

import { login } from '../../redux/modules/auth';
import WobblyText from '../atoms/WobblyText';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeHeading: {
    textAlign: 'center',
    marginBottom: 10,
  },
});

const mapDispatch = {
  login,
};
const connector = connect(undefined, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

class LoginScreen extends React.PureComponent<PropsFromRedux> {
  loginFlow() {
    this.props.login('dev@xmpp.wobbly.app', 'Cee9ech4Ia6wupho');
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <WobblyText title2={true} style={styles.welcomeHeading}>
          Login
        </WobblyText>
        <TextInput placeholder="email" />
        <TextInput placeholder="password" />
        <Button onPress={this.loginFlow.bind(this)} title="Login" />
      </SafeAreaView>
    );
  }
}

export default connector(LoginScreen);
