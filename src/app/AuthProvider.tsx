import React, { useEffect } from "react";
import SecureStore from "expo-secure-store";
import * as authActions from "../redux/modules/auth";

const AuthProvider: React.FC = () => {
  useEffect(() => {
    const bootstrapAsync = async () => {
      let credentials;
      try {
        const jid = await SecureStore.getItemAsync("jid");
        const password = await SecureStore.getItemAsync("password");
      } catch (e) {
        // Failed to get token...
      }
    };
  });
};

const mapDispatchToProps = {authActions["auth/receivedCredentials"]};

export default AuthProvider;