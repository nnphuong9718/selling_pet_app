import axios from 'axios'

const baseURL = 'http://10.45.212.108:3000'

export const fetch = (method, path, params) => {
    console.log(method)
    // console.log(axios.method)
    if (!params) {
        params = {}
    }
    let config = {
        'Content-Type': 'application/json',
    };
    return new Promise((resolve, reject) => {
        // axios.method(baseURL + '/movies.json', config)
        //     .then(response => {
        //         resolve(response.data)
        //     })
        //     .catch(error => {
        //         reject(error);
        //     })
        axios({
            method: method,
            url: baseURL + path,
            config: config,
            // data: params
        })
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                // reject(error)
            })
    })
}