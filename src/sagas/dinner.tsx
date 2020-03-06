import * as firebase from 'firebase/app';
import 'firebase/database';
import { takeEvery, put, call } from 'redux-saga/effects';

function* watchDinnerAsync(action: any) {
    // TODO: add firebase call with action payload
    yield put({
      type: 'SET_DINNER',
      payload: null
    });
}

export function* watchDinner() {
  yield takeEvery('SET_DINNER', watchDinnerAsync);
}
