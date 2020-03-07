import * as firebase from 'firebase/app';
import 'firebase/database';
import { takeEvery, put, call } from 'redux-saga/effects';

function* watchReservationsAsync(action: any) {
  const reservations: object[] = [];
  yield put({
    type: 'SET_RESERVATIONS',
    payload: reservations
  });
}

export function* watchReservations() {
  yield takeEvery('GET_RESERVATIONS', watchReservationsAsync);
}