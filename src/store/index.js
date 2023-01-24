// third-party
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';

import { persistStore, persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

// project imports
import rootReducer from './reducer';

import { createWrapper, HYDRATE } from 'next-redux-wrapper';

// ==============================|| REDUX - MAIN STORE ||============================== //

const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false
      })
  });

const makeStore = () => {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    return makeConfiguredStore();
  } else {
    // we need it only on client side

    const persistConfig = {
      key: 'user',
      whitelist: ['fromClient'], // make sure it does not clash with server keys
      storage
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const store = makeConfiguredStore(persistedReducer);

    store.__persistor = persistStore(store); // Nasty hack

    return store;
  }
};

export const wrapper = createWrapper(makeStore);

const dispatch = makeStore();
const useDispatch = () => useAppDispatch();
const useSelector = useAppSelector;

export { dispatch, useSelector, useDispatch };
