import { useNavigation } from '@react-navigation/native';
import { Formik, FormikProps } from 'formik';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { ConnectedProps, connect } from 'react-redux';
import * as Yup from 'yup';

import { config } from '../../common/config';
import { signup } from '../../redux/modules/auth';
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
  signup,
};
const connector = connect(undefined, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export interface SignupFormFields {
  domain: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const SignupScreen: React.FC<PropsFromRedux> = ({ signup }) => {
  const handleSubmit = (values: SignupFormFields) => {
    signup(values.domain, values.email, values.password);
  };
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <WobblyText title2={true} style={styles.welcomeHeading}>
        Login
      </WobblyText>
      <Formik
        initialValues={{
          domain: config.backendUrl,
          email: '',
          password: '',
          passwordConfirmation: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object({
          domain: Yup.string().required(),
          email: Yup.string().email().required(),
          password: Yup.string().min(8).required(),
          passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('password'), null])
            .required(),
        })}
      >
        {(formikBag: FormikProps<SignupFormFields>) => (
          <View>
            <FormErrors errors={Object.values(formikBag.errors)} />
            <FormField
              autoCapitalize="none"
              onChangeText={formikBag.handleChange('domain')}
              value={formikBag.values.domain}
              placeholder="Domain"
            />
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
            <FormField
              autoCapitalize="none"
              onChangeText={formikBag.handleChange('passwordConfirmation')}
              value={formikBag.values.passwordConfirmation}
              secureTextEntry={true}
              placeholder="Confirm password"
            />
            <WobblyButton
              text="Sign up"
              isLoading={false}
              intent={Intent.PRIMARY}
              onPress={formikBag.handleSubmit}
              disabled={false}
            />
            <WobblyButton
              text="Cancel"
              onPress={() => navigation.goBack()}
              disabled={false}
              minimal={true}
            />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default connector(SignupScreen);
