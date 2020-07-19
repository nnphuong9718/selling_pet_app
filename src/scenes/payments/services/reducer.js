import Immutable from 'immutable'
import { types } from './actions'

const initialState = Immutable.fromJS({
    userAddress: []
})

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case types.GET_USER_ADDRESS_SUCCESS: {
            // console.log('@@@@', payload);
            return state.merge({ userAddress: payload })
        }
        default:
            return state;
    }
}


const select = state => key => state.get('paymentReducer').toJS()[key];

export const selectors = {
    getUserAddress: state => select(state)('userAddress'),
    paymentBill: state => select(state)('paymentBill')
}