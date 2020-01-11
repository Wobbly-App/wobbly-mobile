import { combineReducers } from "@reduxjs/toolkit";
import messages from "./modules/messages";

const rootReducer = combineReducers({ messages });
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
