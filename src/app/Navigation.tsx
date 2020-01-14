import React from "react";
import { IRootState } from "../redux/rootReducer";
import { connect, ConnectedProps } from "react-redux";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SplashScreen from "../components/screens/SplashScreen";
import ChatScreen from "../components/screens/ChatScreen";
import { NavigationNativeContainer } from "@react-navigation/native";
import LoginScreen from "../components/screens/LoginScreen";
import ClientProvider from "./ClientProvider";

const mapState = (state: IRootState) => ({
  isLoadingAuth: state.auth.isLoading,
  credentials: state.auth.credentials
});
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

const Drawer = createDrawerNavigator();
/**
 * Our top-level navigation component.
 * This handles which of the main views a user should
 * see, depending on whether or not they're authenticated.
 */
const Navigation: React.FC<PropsFromRedux> = ({
  isLoadingAuth,
  credentials
}) => {
  return (
    <ClientProvider
      userJid={credentials && credentials.jid}
      userPassword={credentials && credentials.password}
    >
      <NavigationNativeContainer>
        <Drawer.Navigator>
          {isLoadingAuth ? (
            // We're still checking SecureStorage for auth credentials
            <Drawer.Screen name="Splash" component={SplashScreen} />
          ) : !credentials ? (
            // Log in / sign up screen for unauthenticated users
            <Drawer.Screen name="Login" component={LoginScreen} />
          ) : (
            // Main, signed-in app view
            <Drawer.Screen name="Chat" component={ChatScreen} />
          )}
        </Drawer.Navigator>
      </NavigationNativeContainer>
    </ClientProvider>
  );
};

export default connector(Navigation);
