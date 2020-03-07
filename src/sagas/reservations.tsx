import * as firebase from 'firebase/app';
import 'firebase/database';
import { takeEvery, put, call } from 'redux-saga/effects';

function* watchReservationsAsync(action: any) {
  const reservations: object[] = yield call(() => {
    return Promise.all(
      action.payload.map(
        (ref: string) =>
          new Promise((resolve, reject) => {
            firebase
              .database()
              .ref(ref)
              .once('value', snapshot =>
                resolve({
                  ...snapshot.val(),
                  ref
                })
              );
          })
      )
    );
  });
  yield put({
    type: 'SET_RESERVATIONS',
    payload: reservations
  });
}

export function* watchReservations() {
  yield takeEvery('GET_RESERVATIONS', watchReservationsAsync);
}
