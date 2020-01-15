import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ConnectedProps, connect } from 'react-redux';

import ChatScreen from '../components/screens/ChatScreen';
import LoginScreen from '../components/screens/LoginScreen';
import WobblySplashScreen from '../components/screens/WobblySplashScreen';
import { RootState } from '../redux/rootReducer';

import ClientProvider from './ClientProvider';

const mapState = (state: RootState) => ({
  isLoadingAuth: state.auth.isLoading,
  credentials: state.auth.credentials,
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
  credentials,
}) => {
  let component;
  if (isLoadingAuth) {
    component = <WobblySplashScreen />;
  } else if (!credentials) {
    component = <LoginScreen />;
  } else {
    component = (
      <NavigationNativeContainer>
        <RootDrawer.Navigator drawerType="slide">
          <RootDrawer.Screen name="Home" component={HomeNav} />
        </RootDrawer.Navigator>
      </NavigationNativeContainer>
    );
  }
  return (
    <ClientProvider
      userJid={credentials && credentials.jid}
      userPassword={credentials && credentials.password}
    >
      {component}
    </ClientProvider>
  );
};

export default connector(Navigation);
