import React from "react";
import { SafeAreaView, Text, Button } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import { login } from "../../redux/modules/auth";

const mapDispatch = {
  login
};
const connector = connect(undefined, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const LoginScreen: React.FC<PropsFromRedux> = ({ login }) => {
  const loginFlow = () => {
    login("dev@xmpp.wobbly.app", "Cee9ech4Ia6wupho");
  };

  return (
    <SafeAreaView>
      <Text>Please login!</Text>
      <Button onPress={loginFlow} title="Login" />
    </SafeAreaView>
  );
};

export default connector(LoginScreen);
