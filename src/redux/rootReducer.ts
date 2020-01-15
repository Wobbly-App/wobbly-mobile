import { combineReducers } from '@reduxjs/toolkit';

import auth from './modules/auth';
import messages from './modules/messages';

const rootReducer = combineReducers({ messages, auth });
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
