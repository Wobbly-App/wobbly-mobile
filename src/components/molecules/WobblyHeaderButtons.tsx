import { MaterialIcons } from '@expo/vector-icons';
import * as React from 'react';
import * as NavHeaderButtons from 'react-navigation-header-buttons';

import WobblyHeaderButton from '../atoms/WobblyHeaderButton';

/**
 * https://github.com/vonovak/react-navigation-header-buttons#how-to-integrate-in-your-project
 */
const WobblyHeaderButtons: React.FC = (props) => (
  <NavHeaderButtons.HeaderButtons
    HeaderButtonComponent={WobblyHeaderButton}
    OverflowIcon={<MaterialIcons name="more-vert" size={23} color="black" />}
    {...props}
  />
);
export default WobblyHeaderButtons;
