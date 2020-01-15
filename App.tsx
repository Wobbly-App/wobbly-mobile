import React from 'react';
import { Provider } from 'react-redux';

import Navigation from './src/app/Navigation';
import store from './src/redux/store';

const App: React.FC = () => (
  <Provider store={store}>
    <Navigation />
  </Provider>
);

export default App;
