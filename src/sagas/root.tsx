import { fork, all } from 'redux-saga/effects';
import { watchDinner } from './dinner';
import { watchResults }  from './results';
import { watchHost }  from './host';

export function* rootSaga() {
    yield all([
        fork(watchDinner),
        fork(watchResults),
        fork(watchHost)
    ]);
}