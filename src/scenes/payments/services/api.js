import { fetch } from '../../../services/api'


const getUserAddress = () => {
    return fetch('get', `/users/userAddress`);
}

const paymentBill = (payload) => {
    return fetch('post', `/products/paymentBill`, payload)
}

export default {
    getUserAddress,
    paymentBill
}