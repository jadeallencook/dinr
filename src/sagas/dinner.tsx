import * as firebase from 'firebase/app';
import 'firebase/database';
import { takeEvery, put, call } from 'redux-saga/effects';

function* watchDinnerAsync(action: any) {
  const dinner: object = action.payload
    ? yield call(() => {
        return new Promise((resolve, reject) => {
          firebase
            .database()
            .ref(action.payload)
            .once('value', snapshot => {
              resolve(
                snapshot.val()
                  ? {
                      ...snapshot.val(),
                      ref: action.payload
                    }
                  : {
                      ref: action.payload
                    }
              );
            });
        });
      })
    : null;
  yield put({
    type: 'SET_DINNER',
    payload: dinner
  });
}

export function* watchDinner() {
  yield takeEvery('GET_DINNER', watchDinnerAsync);
}
