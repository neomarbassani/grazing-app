import { put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import NetInfo from '@react-native-community/netinfo';
import { OFFLINE, ONLINE } from 'redux-offline-queue';

export function* startWatchingNetworkConnectivity() {
  const channel = eventChannel((emitter) => {
    const unsubscribe = NetInfo.addEventListener((state) => emitter(state));

    return () => unsubscribe();
  });

  try {
    while (true) {
      const { isConnected } = yield take(channel);
      console.log(isConnected);

      if (isConnected) {
        yield put({ type: ONLINE });
      } else {
        yield put({ type: OFFLINE });
      }
    }
  } finally {
    channel.close();
  }
}
