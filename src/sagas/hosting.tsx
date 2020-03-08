import * as firebase from 'firebase/app';
import 'firebase/database';
import { takeEvery, put, call } from 'redux-saga/effects';

function* watchHostingAsync(action: any) {
  const reservations: object[] = yield call(() => {
    return Promise.all(
      action.payload.map(
        (ref: string) =>
          new Promise((resolve, reject) => {
            firebase
              .database()
              .ref(`dinners/${ref}`)
              .once('value', snapshot =>
                resolve({
                  ...snapshot.val(),
                  ref: `dinners/${ref}`
                })
              );
          })
      )
    );
  });
  yield put({
    type: 'SET_HOSTING',
    payload: reservations
  });
}

export function* watchHosting() {
  yield takeEvery('GET_HOSTING', watchHostingAsync);
}
