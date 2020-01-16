import { combineReducers } from '@reduxjs/toolkit';

import auth from './modules/auth';
import chats from './modules/chats';
import messages from './modules/messages';

const rootReducer = combineReducers({ messages, auth, chats });
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
