import axios from 'axios'
import * as AsyncStorage from '../../utils/asyncStorage'

const baseURL = 'http://172.20.10.14:3000'

export const fetch = async (method, path, params) => {
    const { keys, getItem } = AsyncStorage;
    let loginToken = '';
    await getItem(keys.firebase).then(token => {
        loginToken = token;
    })

    console.log('####', loginToken)

    if (!params) {
        params = {}
    }
    let config = {
        'Content-Type': 'application/json',


    };
    let headers = {
        'Authorization': loginToken ? loginToken : ''
    }
    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: baseURL + path,
            headers: headers,

            data: params
        })
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                // reject(error)
            })
    })
}