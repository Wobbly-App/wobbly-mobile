import React from 'react';
import { Button } from 'react-native';
import { ConnectedProps, connect } from 'react-redux';

import { logout } from '../../redux/modules/auth';

const mapDispatch = {
  logout,
};
const connector = connect(undefined, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
const LogoutButton: React.FC<PropsFromRedux> = ({ logout }) => (
  <Button onPress={logout} title="Logout" />
);

export default connector(LogoutButton);
