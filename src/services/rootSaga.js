import { all } from 'redux-saga/effects'

import home from '../scenes/home/services/sagas';

export default function* rootSaga() {
    yield all([
        home,
    ])
}