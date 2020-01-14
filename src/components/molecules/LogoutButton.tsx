import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { emptyCredentials } from "../../redux/modules/auth";
import { Button } from "react-native";

const mapDispatch = {
  emptyCredentials
};
const connector = connect(undefined, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
const LogoutButton: React.FC<PropsFromRedux> = ({ emptyCredentials }) => {
  const logoutFlow = () => {
    emptyCredentials();
  };
  return <Button onPress={logoutFlow} title="Logout" />;
};

export default connector(LogoutButton);
