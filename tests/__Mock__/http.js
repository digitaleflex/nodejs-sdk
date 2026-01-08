const http = require('../../lib/http');

let success = true

http.defaults.adapter = async (config) => {
    if (success) {
        return {
            data: {},
            status: 200,
            statusText: 'OK',
            headers: {},
            config,
            request: {}
        };
    } else {
        const error = new Error('Request failed with status code 404');
        error.isAxiosError = true;
        error.response = {
            data: {},
            status: 404,
            statusText: 'Not Found',
            headers: {},
            config,
            request: {}
        };
        throw error;
    }
}

module.exports = (value) => {
    success = value
};