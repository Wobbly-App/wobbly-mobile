import { StackNavigationProp } from '@react-navigation/stack';
import { Formik, FormikHelpers } from 'formik';
import React, { useContext } from 'react';
import { View, TextInput, Button } from 'react-native';
import { ConnectedProps, connect } from 'react-redux';

import { ClientContext, useWobblyClient } from '../../app/ClientProvider';
import { MainStackParamList } from '../../app/Navigation';
import { createChat } from '../../redux/modules/chats';

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
        <View>
          <TextInput
            onChangeText={handleChange('recipient')}
            onBlur={handleBlur('recipient')}
            value={values.recipient}
          />
          <Button onPress={handleSubmit as any} title="Submit" />
        </View>
      )}
    </Formik>
  );
};

export default connector(NewChatScreen);
