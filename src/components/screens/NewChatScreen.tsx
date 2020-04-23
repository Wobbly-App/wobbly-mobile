import { StackNavigationProp } from '@react-navigation/stack';
import { Formik, FormikHelpers } from 'formik';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { ConnectedProps, connect } from 'react-redux';

import { useWobblyClient } from '../../app/ClientProvider';
import { MainStackParamList } from '../../app/Navigation';
import { createChat } from '../../redux/modules/chats';
import ScreenContainer from '../atoms/ScreenContainer';

const style = StyleSheet.create({
  input: {
    marginVertical: 20,
  },
});

const mapDispatch = {
  createChat,
};
const connector = connect(undefined, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface FormValues {
  recipient: string;
}

type NavigationProp = StackNavigationProp<MainStackParamList, 'NewChat'>;
interface NewChatScreenProps extends PropsFromRedux {
  navigation: NavigationProp;
}
const NewChatScreen: React.FC<NewChatScreenProps> = ({
  createChat,
  navigation,
}) => {
  const client = useWobblyClient();

  const submit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    if (!values.recipient) {
      return;
    }
    createChat(client, values.recipient);
    actions.setSubmitting(false);
    navigation.navigate({ name: 'Chat', params: { chatId: values.recipient } });
  };
  return (
    <Formik initialValues={{ recipient: '' }} onSubmit={submit}>
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <ScreenContainer>
          <Input
            label="Recipient"
            placeholder="username"
            onChangeText={handleChange('recipient')}
            onBlur={handleBlur('recipient')}
            value={values.recipient}
            containerStyle={style.input}
          />
          <Button onPress={handleSubmit as any} title="Submit" />
        </ScreenContainer>
      )}
    </Formik>
  );
};

export default connector(NewChatScreen);
