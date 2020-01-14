import React from "react";
import { IRootState } from "../redux/rootReducer";
import { connect, ConnectedProps } from "react-redux";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
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

const MainStack = createStackNavigator();
const RootDrawer = createDrawerNavigator();

const HomeNav = () => (
  <MainStack.Navigator>
    <MainStack.Screen name="Chat" component={ChatScreen} />
  </MainStack.Navigator>
);

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
      {isLoadingAuth ? (
        <SplashScreen />
      ) : !credentials ? (
        <LoginScreen />
      ) : (
        <NavigationNativeContainer>
          <RootDrawer.Navigator>
            <RootDrawer.Screen name="Home" component={HomeNav} />
          </RootDrawer.Navigator>
        </NavigationNativeContainer>
      )}
    </ClientProvider>
  );
};

export default connector(Navigation);
