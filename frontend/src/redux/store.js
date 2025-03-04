import {configureStore,combineReducers} from "@reduxjs/toolkit"
import {
    persistReducer,
    persistStore,
  } from "redux-persist";
import storage from "redux-persist/lib/storage"
import userReducer from "./user/userSlice.js"

const rootReducer = combineReducers({
    user: userReducer,
  });

//Redux Persist configuration
const persistConfig ={
    key: "root",
    storage,
    version:1
}

//Apply persistReducer to root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

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