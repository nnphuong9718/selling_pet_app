import Immutable from 'immutable'
import { types } from './actions'

const initialState = Immutable.fromJS({
    listPet: []
})

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case types.GET_LIST_PET_SUCCESS: {
            return state.merge({ listPet: payload })
        }
        default:
            return state;
    }
}


const select = state => key => state.get('homeReducer').toJS()[key];

export const selectors = {
    getListPet: state => select(state)('listPet'),
}