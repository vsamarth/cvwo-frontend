import {
  combineReducers,
  configureStore,
  ConfigureStoreOptions,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import api from "./api";
import filter from "./filter";
import user from "./user";
import storage from "redux-persist/lib/storage";
export const createStore = (
  options?: ConfigureStoreOptions["preloadedState"] | undefined
) => {
  const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    filter,
    user,
  });

  const persistedReducer = persistReducer(
    { key: "state", storage, whitelist: ["filter", "user"] },
    rootReducer
  );
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
    ...options,
  });
  const persistor = persistStore(store);

  return { store, persistor };
};

const x = createStore();

export const store = x.store;
export const persistor = x.persistor;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
