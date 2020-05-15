import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  StackHeaderLeftButtonProps,
} from '@react-navigation/stack';
import * as Font from 'expo-font';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { enableScreens } from 'react-native-screens';
import * as NavHeaderButtons from 'react-navigation-header-buttons';
import { ConnectedProps, connect } from 'react-redux';

import WobblyHeaderButtons from '../components/molecules/WobblyHeaderButtons';
import WobblyDrawer from '../components/organisms/WobblyDrawer';
import ChatScreen from '../components/screens/ChatScreen';
import LoginScreen from '../components/screens/LoginScreen';
import NewChatScreen from '../components/screens/NewChatScreen';
import NoChatsScreen from '../components/screens/NoChatsScreen';
import SignupScreen from '../components/screens/SignupScreen';
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

  // Adapted from https://stackoverflow.com/questions/58478450/react-native-importing-fonts-with-async-componentdidmount-expected
  const [fontLoaded, setFontLoaded] = useState(false);
  async function fontInit() {
    await Font.loadAsync({
      'open-sans-regular': require('../../assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-semi-bold': require('../../assets/fonts/OpenSans-SemiBold.ttf'),
      'open-sans-bold': require('../../assets/fonts/OpenSans-Bold.ttf'),
      'montserrat-regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
      'montserrat-bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
      'montserrat-black': require('../../assets/fonts/Montserrat-Black.ttf'),
    });
    setFontLoaded(true);
  }
  useEffect(() => {
    fontInit();
  }, []);

  if (isLoadingAuth || !fontLoaded) {
    component = <WobblySplashScreen />;
  } else if (!credentials) {
    component = (
      <ModalStack.Navigator mode="modal">
        <ModalStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <ModalStack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
      </ModalStack.Navigator>
    );
  } else if (!clientReady) {
    component = <ActivityIndicator />;
  } else {
    const MainStack: React.FC = () => (
      <RootDrawer.Navigator
        drawerType="slide"
        drawerContent={(props) => <WobblyDrawer {...props} />}
      >
        <RootDrawer.Screen name="Home" component={HomeNav} />
      </RootDrawer.Navigator>
    );
    component = (
      <ModalStack.Navigator mode="modal">
        <ModalStack.Screen
          name="MainStack"
          component={MainStack}
          options={{ headerShown: false }}
        />
        <ModalStack.Screen name="NewChat" component={NewChatScreen} />
      </ModalStack.Navigator>
    );
  }

  return (
    <ClientProvider credentials={credentials}>
      <NavigationContainer ref={NavigationService.navigationRef as any}>
        {component}
      </NavigationContainer>
    </ClientProvider>
  );
};

export default connector(Navigation);
