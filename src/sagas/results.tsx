import * as firebase from 'firebase/app';
import 'firebase/database';
import { takeEvery, put, call } from 'redux-saga/effects';
import locationToUrl from '../helpers/location-to-url';

function* watchResultsAsync(action: any) {
  const { location } = action.payload;
  const datestamps = Array(3)
    .fill(new Date())
    .map((date, index) => {
      var today = new Date();
      var tomorrow = new Date();
      return new Date(tomorrow.setDate(today.getDate() + index))
        .toLocaleDateString()
        .replace(/\//g, '-');
    });
  if (location)
    console.log(`dinners/${locationToUrl(location)}_${datestamps[0]}`);
  const results: Object[] = location
    ? yield call(() => {
        return Promise.all(
          datestamps.map(
            stamp =>
              new Promise((resolve, reject) => {
                firebase
                  .database()
                  .ref(`dinners/${locationToUrl(location)}_${stamp}`)
                  .once('value', function(snapshot) {
                    resolve(snapshot.val());
                  });
              })
          )
        );
      })
    : [];
  yield put({
    type: 'SET_RESULTS',
    payload: results
  });
}

export function* watchResults() {
  yield takeEvery('GET_RESULTS', watchResultsAsync);
}
