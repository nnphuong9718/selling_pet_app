import axios from 'axios'

const baseURL = 'http://172.16.2.213:3000'

export const fetch = (method, path, params) => {
    if (!params) {
        params = {}
    }
    let config = {
        'Content-Type': 'application/json',
    };
    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: baseURL + path,
            config: config,
            data: params
        })
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}