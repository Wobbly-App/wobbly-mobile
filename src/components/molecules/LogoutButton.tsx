import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { logout } from "../../redux/modules/auth";
import { Button } from "react-native";

const mapDispatch = {
  logout
};
const connector = connect(undefined, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
const LogoutButton: React.FC<PropsFromRedux> = ({ logout }) => {
  return <Button onPress={logout} title="Logout" />;
};

export default connector(LogoutButton);
