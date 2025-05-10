import { configureStore } from "@reduxjs/toolkit";
import {UserR}

const store = configureStore({
  reducer: {
    // global reducers go here
    user: UserReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
