import { call, put, takeLatest } from 'redux-saga/effects';
import { types, actions } from './actions';
import api from './api'

const getUserAddress = function* ({ payload }) {
    // console.log('aaaa')
    const res = yield call(api.getUserAddress);
    // console.log('####', res.data)
    if (res && res.success) {
        yield put(actions.getUserAddressSuccess(res.data))
    } else {
        yield put(actions.getUserAddressFail())
    }
}

const paymentBill = function* ({ payload, onSuccess, onError }) {
    const res = yield call(api.paymentBill, payload);
    console.log('res', res);
    if (res && res.success) {
        yield put(actions.paymentBillSuccess());
        onSuccess();
    } else {
        yield put(actions.paymentBillFail());
        onError();
    }
}

const watcher = function* () {
    yield takeLatest(types.GET_USER_ADDRESS, getUserAddress);
    yield takeLatest(types.PAYMENT_BILL, paymentBill);
}

export default watcher()