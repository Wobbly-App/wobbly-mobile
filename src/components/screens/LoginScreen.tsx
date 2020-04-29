import { Formik, FormikProps } from 'formik';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { ConnectedProps, connect } from 'react-redux';

import { login } from '../../redux/modules/auth';
import { FormErrors, FormField, WobblyText } from '../atoms';
import WobblyButton, { Intent } from '../atoms/WobblyButton';

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

export interface LoginFormFields {
  email: string;
  password: string;
}

class LoginScreen extends React.PureComponent<PropsFromRedux> {
  constructor(props: any) {
    super(props);
    this.loginFlow = this.loginFlow.bind(this);
  }

  loginFlow(values: any) {
    const { email, password } = values;
    this.props.login('dev@xmpp.wobbly.app', 'Cee9ech4Ia6wupho');

    // Referencing previous login screen code
    // https://github.com/Wobbly-App/wobbly-frontend/blob/develop/src/components/screens/LoginScreen.tsx
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <WobblyText title2={true} style={styles.welcomeHeading}>
          Login
        </WobblyText>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values) => this.loginFlow(values)}
          validateOnChange={false}
        >
          {(formikBag: FormikProps<LoginFormFields>) => (
            <View>
              <FormErrors errors={Object.values(formikBag.errors)} />
              <FormField
                autoCapitalize="none"
                onChangeText={formikBag.handleChange('email')}
                value={formikBag.values.email}
                placeholder="Email"
                keyboardType="email-address"
              />
              <FormField
                autoCapitalize="none"
                onChangeText={formikBag.handleChange('password')}
                value={formikBag.values.password}
                secureTextEntry={true}
                placeholder="Password"
              />
              <WobblyButton
                text="Log in"
                isLoading={false}
                intent={Intent.PRIMARY}
                onPress={formikBag.handleSubmit}
                disabled={false}
              />
              <WobblyButton
                text="Cancel"
                onPress={undefined}
                disabled={false}
                minimal={true}
              />
            </View>
          )}
        </Formik>
      </SafeAreaView>
    );
  }
}

export default connector(LoginScreen);
