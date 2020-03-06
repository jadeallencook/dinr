import * as firebase from 'firebase/app';
import 'firebase/database';
import { takeEvery, put, call } from 'redux-saga/effects';
import locationToUrl from '../helpers/location-to-url';
import zipcodeToLocation from '../helpers/zipcode-to-location';
import flattenResultsArray from '../helpers/flatten-results-array';

function* watchResultsAsync(action: any) {
  if (action.payload > 9999) {
    const location = zipcodeToLocation(action.payload);
    const datestamps = Array(3)
      .fill(new Date())
      .map((date, index) => {
        var today = new Date();
        var tomorrow = new Date();
        return new Date(tomorrow.setDate(today.getDate() + index))
          .toLocaleDateString()
          .replace(/\//g, '-');
      });
    const results: Object[] = location
      ? yield call(() => {
          return Promise.all(
            datestamps.map(
              stamp =>
                new Promise((resolve, reject) => {
                  const ref = `dinners/${locationToUrl(location)}_${stamp}`;
                  firebase
                    .database()
                    .ref(ref)
                    .once('value', function(snapshot) {
                      const object = {};
                      const response = snapshot.val();
                      if (response) {
                        Object.keys(response).forEach(key => {
                          object[key] = { ...response[key], ref: `${ref}/${key}` };
                        });
                      }
                      resolve(object);
                    });
                })
            )
          );
        })
      : [];
    yield put({
      type: 'SET_RESULTS',
      payload: flattenResultsArray(results)
    });
  }
}

export function* watchResults() {
  yield takeEvery('SET_ZIPCODE', watchResultsAsync);
}
