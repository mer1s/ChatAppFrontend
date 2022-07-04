import { configureStore } from "@reduxjs/toolkit";
import { uiReducers } from "./ui-slice";
import { chatReducers } from "./chat-slice";

const store = configureStore({
  reducer: { ui: uiReducers, chat: chatReducers },
});

export default store;
