import { call, put, takeLatest } from 'redux-saga/effects';
import { types, actions } from './actions';
import api from './api'

const getListPet = function* ({ payload }) {
    console.log('aaaa')
    const res = yield call(api.getListPet);
    console.log(res)
    if (res) {
        yield put(actions.getListPetSuccess(res))
    } else {
        yield put(actions.getListPetFail())
    }
}

const watcher = function* () {
    yield takeLatest(types.GET_LIST_PET, getListPet)
}

export default watcher()