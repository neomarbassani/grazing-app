import AsyncStorage from '@react-native-community/async-storage';
import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import {
  seamlessImmutableReconciler,
  seamlessImmutableTransformCreator,
} from 'redux-persist-seamless-immutable';
import createSagaMiddleware from 'redux-saga';
import {
  suspendSaga,
  offlineMiddleware,
  consumeActionMiddleware,
} from 'redux-offline-queue';

import rootReducer from './ducks';
import rootSaga from './sagas';

const transformerConfig = {
  whitelistPerReducer: {
    reducer: ['auth', 'calcHistory', 'offline'],
  },
};

const persistConfig = {
  key: 'grazing',
  storage: AsyncStorage,
  stateReconciler: seamlessImmutableReconciler,
  transforms: [seamlessImmutableTransformCreator(transformerConfig)],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [];

const sagaMiddleware = createSagaMiddleware();

middlewares.push(offlineMiddleware());

middlewares.push(suspendSaga(sagaMiddleware));

middlewares.push(consumeActionMiddleware());

const composer = compose(applyMiddleware(...middlewares));

const store = createStore(persistedReducer, composer);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
