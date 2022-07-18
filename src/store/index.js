import { configureStore } from "@reduxjs/toolkit";
import { uiReducers } from "./ui-slice";
import { chatReducers } from "./chat-slice";
import { requestsReducers } from "./request-slice";

const store = configureStore({
  reducer: { ui: uiReducers, chat: chatReducers, requests: requestsReducers },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
