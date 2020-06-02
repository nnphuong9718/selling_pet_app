import { combineReducers } from 'redux-immutable';

import homeReducer from '../scenes/home/services/reducer';

const reducers = {
    homeReducer
}

const reducer = combineReducers(reducers);

console.log('####', reducer)

export default (state, action) => {
    return reducer(state, action);
}

