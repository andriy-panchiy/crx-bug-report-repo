import authSlice from '@app/redux/slices/authSlice';
import widgetsSlice from '@app/redux/slices/widgetsSlice';
import { wrapStore } from '@eduardoac-skimlinks/webext-redux';
import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { localStorage } from 'redux-persist-webextension-storage';
import { WebStorage } from 'redux-persist/lib/types';

const persistConfig = {
  key: 'root',
  storage: localStorage as WebStorage,
  whitelist: ['auth'],
  blacklist: ['widgets'],
};

const reducers = combineReducers({
  auth: authSlice,
  widgets: widgetsSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const initializeWrappedStore = () => wrapStore(store);

export const persistor = persistStore(store);
export const getCurrentState = () => store.getState();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;
