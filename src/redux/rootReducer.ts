import { combineReducers } from "@reduxjs/toolkit";
import messages from "./modules/messages";
import auth from "./modules/auth";

const rootReducer = combineReducers({ messages, auth });
export type IRootState = ReturnType<typeof rootReducer>;
export default rootReducer;
