import { all } from 'redux-saga/effects'

import home from '../scenes/home/services/sagas';
import payment from '../scenes/payments/services/sagas';

export default function* rootSaga() {
    yield all([
        home,
        payment,
    ])
}