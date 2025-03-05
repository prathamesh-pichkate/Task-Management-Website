import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer as createPersistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // Import storage for local storage
import userReducer from "./user/userSlice.js";
import themeReducer from "./theme/themeSlice.js";

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
});

// Redux Persist configuration
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

// Apply persistReducer to rootReducer
const persistedReducer = createPersistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Persistor instance
export const persistor = persistStore(store);

export default store;