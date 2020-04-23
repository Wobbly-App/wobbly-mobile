import { MaterialIcons } from '@expo/vector-icons';
import * as React from 'react';
import * as NavHeaderButtons from 'react-navigation-header-buttons';

interface HeaderButtonProps {
  title: string;
}

/**
 * https://github.com/vonovak/react-navigation-header-buttons#how-to-integrate-in-your-project
 */
const WobblyHeaderButton: React.FC<HeaderButtonProps> = (props) => (
  <NavHeaderButtons.HeaderButton
    {...props}
    IconComponent={MaterialIcons}
    iconSize={23}
    color="black"
  />
);

export default WobblyHeaderButton;
