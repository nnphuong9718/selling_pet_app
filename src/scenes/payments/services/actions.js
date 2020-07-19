import { createAction, mapType, status } from '../../../utils/reduxHelper';

export const types = {
    GET_USER_ADDRESS: mapType('GET_USER_ADDRESS', status.start),
    GET_USER_ADDRESS_SUCCESS: mapType('GET_USER_ADDRESS_SUCCESS', status.success),
    GET_USER_ADDRESS_FAIL: mapType('GET_USER_ADDRESS_FAIL', status.failure),

    PAYMENT_BILL: mapType('PAYMENT_BILL', status.start),
    PAYMENT_BILL_SUCCESS: mapType('PAYMENT_BILL_SUCCESS', status.success),
    PAYMENT_BILL_FAIL: mapType('PAYMENT_BILL_FAIL', status.failure),
}

export const actions = {
    getUserAddress: createAction(types.GET_USER_ADDRESS),
    getUserAddressSuccess: createAction(types.GET_USER_ADDRESS_SUCCESS),
    getUserAddressFail: createAction(types.GET_USER_ADDRESS_FAIL),

    paymentBill: createAction(types.PAYMENT_BILL),
    paymentBillSuccess: createAction(types.PAYMENT_BILL_SUCCESS),
    paymentBillFail: createAction(types.PAYMENT_BILL_FAIL),
}