import { fetch } from '../../../services/api'


const getListPet = () => {
    return fetch('get', '/products')
}


export default {
    getListPet
}