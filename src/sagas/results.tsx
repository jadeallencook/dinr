import * as firebase from 'firebase/app';
import 'firebase/database';
import { takeEvery, put, call } from 'redux-saga/effects';
import locationToUrl from '../helpers/location-to-url';
import zipcodeToLocation from '../helpers/zipcode-to-location';
import flattenResultsArray from '../helpers/flatten-results-array';
import filterResults from '../filters/filter-results';

function* watchResultsAsync(action: any) {
  if (action.payload > 9999) {
    const location = zipcodeToLocation(action.payload);
    const today = new Date().toLocaleDateString().split('/');
    const month = today[0];
    const year = today[2];
    const datestamps = [`${month}_${year}`];
    let results: Object[] = filterResults(
      flattenResultsArray(
        location
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
                              object[key] = {
                                ...response[key],
                                ref: `${ref}/${key}`
                              };
                            });
                          }
                          resolve(object);
                        });
                    })
                )
              );
            })
          : []
      )
    );
    yield put({
      type: 'SET_RESULTS',
      payload: results
    });
  }
}

export function* watchResults() {
  yield takeEvery('SET_ZIPCODE', watchResultsAsync);
}
