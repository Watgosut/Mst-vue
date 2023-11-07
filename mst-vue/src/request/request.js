import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';

const service = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 5000,
    async: true,
    crossDomain: true,
});

export default service;