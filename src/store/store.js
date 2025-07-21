import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import songsReducer from './slices/songsSlice';
import toasterReducer from './slices/toasterSlice';
import rootSaga from './sagas/rootSaga';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the store
export const store = configureStore({
  reducer: {
    songs: songsReducer,
    toaster: toasterReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Disable serializability check for saga actions
      serializableCheck: {
        ignoredActions: ['saga/START', 'saga/STOP', 'saga/CANCEL']
      }
    }).concat(sagaMiddleware)
});

// Run the root saga
sagaMiddleware.run(rootSaga);
