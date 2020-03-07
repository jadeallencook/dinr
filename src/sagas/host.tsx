import * as firebase from 'firebase/app';
import 'firebase/database';
import { takeEvery, put, call } from 'redux-saga/effects';

function* watchHostAsync(action: any) {
  const host: object = action.payload
    ? yield call(() => {
        return new Promise((resolve, reject) => {
          firebase
            .database()
            .ref(`profiles/${action.payload}`)
            .once('value', snapshot => {
              resolve(
                snapshot.val()
                  ? {
                      ...snapshot.val(),
                      uid: action.payload
                    }
                  : {
                      uid: action.payload
                    }
              );
            });
        });
      })
    : null;
  yield put({
    type: 'SET_HOST',
    payload: host
  });
}

export function* watchHost() {
  yield takeEvery('GET_HOST', watchHostAsync);
}
