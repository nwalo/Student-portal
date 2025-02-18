import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "./storage";
import studentSlice from "./slices/studentSlice";

// Configuration for persistence
const persistConfig = {
  key: "root",
  storage,
};

// Combine reducers to persist
const reducersToPersist = combineReducers({
  students: studentSlice,
});

const persistedReducer = persistReducer(persistConfig, reducersToPersist);

// Root reducer
const rootReducer = combineReducers({
  persisted: persistedReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredPaths: ["register", "rehydrate"],
      },
    }),
});

const persistor = persistStore(store);

export { persistor };
// Types for dispatch and state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
