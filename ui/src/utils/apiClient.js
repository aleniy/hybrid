import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/api/v1';

class ApiClient {
    static async get(url, options) {
        try {
            const result = await axios.get(url, options);

            return result;
        } catch (error) {
            throw error;
        }
    }

    static async post(url, body, options) {
        try {
            const result = await axios.post(url, body, options);

            return result;
        } catch (error) {
            console.log(error);
            throw error
        }
    }
}