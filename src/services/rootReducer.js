import { combineReducers } from 'redux-immutable';

import homeReducer from '../scenes/home/services/reducer';
import paymentReducer from '../scenes/payments/services/reducer';

const reducers = {
    homeReducer,
    paymentReducer
}

const reducer = combineReducers(reducers);

export default (state, action) => {
    return reducer(state, action);
}

