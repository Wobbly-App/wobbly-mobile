// From https://reactnavigation.org/docs/en/next/navigating-without-navigation-prop.html

import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/routers';
import React from 'react';

export const navigationRef = React.createRef<DrawerNavigationProp<{}>>();

export const openDrawer = () => {
  navigationRef.current &&
    navigationRef.current.dispatch(DrawerActions.openDrawer());
};
