import AsyncStorage from '@react-native-community/async-storage';
import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import {
  seamlessImmutableReconciler,
  seamlessImmutableTransformCreator,
} from 'redux-persist-seamless-immutable';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './ducks';
import rootSaga from './sagas';

const transformerConfig = {
  whitelistPerReducer: {
    reducer: ['auth'],
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

middlewares.push(sagaMiddleware);

const composer = compose(applyMiddleware(...middlewares));

const store = createStore(persistedReducer, composer);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
