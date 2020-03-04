import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  StackHeaderLeftButtonProps,
} from '@react-navigation/stack';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { enableScreens } from 'react-native-screens';
import * as NavHeaderButtons from 'react-navigation-header-buttons';
import { ConnectedProps, connect } from 'react-redux';

import WobblyHeaderButtons from '../components/molecules/WobblyHeaderButtons';
import Drawer from '../components/organisms/Drawer';
import ChatScreen from '../components/screens/ChatScreen';
import LoginScreen from '../components/screens/LoginScreen';
import NewChatScreen from '../components/screens/NewChatScreen';
import NoChatsScreen from '../components/screens/NoChatsScreen';
import WobblySplashScreen from '../components/screens/WobblySplashScreen';
import { RootState } from '../redux/rootReducer';

import ClientProvider, { useWobblyClient } from './ClientProvider';
import * as NavigationService from './NavigationService';

// Performance improvement:
// https://reactnavigation.org/docs/en/next/react-native-screens.html
enableScreens();

const mapState = (state: RootState) => ({
  isLoadingAuth: state.auth.isLoadingAuth,
  clientReady: state.auth.clientReady,
  credentials: state.auth.credentials,
  hasChats: !!state.chats.allIds,
});
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

export type MainStackParamList = {
  Chat: { chatId: string };
  NewChat: undefined;
  NoChats: undefined;
};

const ModalStack = createStackNavigator();
const MainStack = createStackNavigator<MainStackParamList>();
const RootDrawer = createDrawerNavigator();

const HomeNav: React.FC = () => {
  const client = useWobblyClient();
  const DrawerButton: React.FC<StackHeaderLeftButtonProps> = () => (
    <WobblyHeaderButtons>
      <NavHeaderButtons.Item
        title="drawer"
        iconName="menu"
        onPress={NavigationService.openDrawer}
      />
    </WobblyHeaderButtons>
  );
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="NoChats"
        component={NoChatsScreen}
        options={() => ({
          title: 'NoChats',
          headerLeft: DrawerButton,
        })}
      />
      <MainStack.Screen
        name="Chat"
        component={ChatScreen}
        initialParams={{ chatId: client.jid }}
        options={({ route }) => ({
          title: route.params.chatId,
          headerLeft: DrawerButton,
        })}
      />
    </MainStack.Navigator>
  );
};

/**
 * Our top-level navigation component.
 * This handles which of the main views a user should see, depending on whether
 * or not they're authenticated.
 */
const Navigation: React.FC<PropsFromRedux> = ({
  clientReady,
  credentials,
  isLoadingAuth,
}) => {
  let component;
  if (isLoadingAuth) {
    component = <WobblySplashScreen />;
  } else if (!credentials) {
    component = <LoginScreen />;
  } else if (!clientReady) {
    component = <ActivityIndicator />;
  } else {
    const MainStack: React.FC = () => (
      <RootDrawer.Navigator drawerType="slide" drawerContent={() => <Drawer />}>
        <RootDrawer.Screen name="Home" component={HomeNav} />
      </RootDrawer.Navigator>
    );
    component = (
      <NavigationContainer ref={NavigationService.navigationRef as any}>
        <ModalStack.Navigator mode="modal">
          <ModalStack.Screen
            name="MainStack"
            component={MainStack}
            options={{ headerShown: false }}
          />
          <ModalStack.Screen name="NewChat" component={NewChatScreen} />
        </ModalStack.Navigator>
      </NavigationContainer>
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
