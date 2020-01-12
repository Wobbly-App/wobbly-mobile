import React from "react";
import { IRootState } from "../redux/rootReducer";
import { connect, ConnectedProps } from "react-redux";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SplashScreen from "../components/screens/SplashScreen";
import ChatScreen from "../components/screens/ChatScreen";
import { NavigationNativeContainer } from "@react-navigation/native";
import AuthProvider from "./AuthProvider";
import LoginScreen from "../components/screens/LoginScreen";

const mapState = (state: IRootState) => ({
  isLoadingAuth: state.auth.isLoading,
  isLoggedIn: !!state.auth.credentials
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
  isLoggedIn
}) => {
  return (
    <AuthProvider>
      <NavigationNativeContainer>
        <Drawer.Navigator>
          {isLoadingAuth ? (
            // We're still checking SecureStorage for auth credentials
            <Drawer.Screen name="Splash" component={SplashScreen} />
          ) : isLoggedIn ? (
            // Main, signed-in app view
            <Drawer.Screen name="Chat" component={ChatScreen} />
          ) : (
            // Log in / sign up screen for unauthenticated users
            <Drawer.Screen name="Login" component={LoginScreen} />
          )}
        </Drawer.Navigator>
      </NavigationNativeContainer>
    </AuthProvider>
  );
};

export default connector(Navigation);
