import React, { useEffect } from "react";
import { loadCredentials } from "../redux/modules/auth";
import { connect, ConnectedProps } from "react-redux";

const connector = connect(undefined, { loadCredentials });
type PropsFromRedux = ConnectedProps<typeof connector>;

const AuthProvider: React.FC<PropsFromRedux> = ({
  loadCredentials,
  children
}) => {
  useEffect(() => {
    console.log("Loading credentials");
    loadCredentials();
  });

  return <>{children}</>;
};

export default connector(AuthProvider);
