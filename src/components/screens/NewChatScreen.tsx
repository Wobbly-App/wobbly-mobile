import { StackNavigationProp } from '@react-navigation/stack';
import { Formik, FormikHelpers } from 'formik';
import React from 'react';
import { ConnectedProps, connect } from 'react-redux';

import { useWobblyClient } from '../../app/ClientProvider';
import { MainStackParamList } from '../../app/Navigation';
import { createChat } from '../../redux/modules/chats';
import { ScreenContainer, FormField, FormLabel, WobblyButton } from '../atoms/';
import { Intent } from '../atoms/WobblyButton';

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
          <FormLabel>Recipient</FormLabel>
          <FormField
            placeholder="username"
            onChangeText={handleChange('recipient')}
            onBlur={handleBlur('recipient')}
            value={values.recipient}
          />
          <WobblyButton
            onPress={handleSubmit as any}
            text="Submit"
            intent={Intent.PRIMARY}
          />
        </ScreenContainer>
      )}
    </Formik>
  );
};

export default connector(NewChatScreen);
