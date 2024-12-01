import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import authSlice from "./slices/authSlice";
import persistStore from "redux-persist/es/persistStore";
import projectSlice from "./slices/projectSlice";
import postSlice from "./slices/apiSlice";

const reducers = combineReducers({
  auth: authSlice,
  projectType: projectSlice,
  postType:postSlice
});

const persistConfig = {
  key: "upu",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false,
    })
});
export const persistor = persistStore(store);
