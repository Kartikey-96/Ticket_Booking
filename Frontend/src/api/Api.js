import axios from 'axios';
export const BASE_URL = "http://127.0.0.1:8000/api/";

export const allMovies = async (params) => {
    const { page, query, rating, genre, language } = params;
    const queryParams = new URLSearchParams(Object.entries(params).filter(([_, value]) => value !== null));
    let url = `${BASE_URL}movies/?${queryParams.toString()}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const bookingAPI = async (httpMethod, access_token, data = {}, id = null) => {
    const headers = {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
    };
    let apiUrl = `${BASE_URL}booking/${id ? `${id}/` : ''}`;
    try {
        let response;
        switch (httpMethod) {
            case 'GET':
                response = await axios.get(apiUrl, { headers });
                break;
            case 'POST':
                response = await axios.post(apiUrl, data, { headers });
                break;
            case 'PUT':
                response = await axios.put(apiUrl, data, { headers });
                break;
            case 'DELETE':
                response = await axios.delete(apiUrl, { headers });
                break;
            default:
                throw new Error(`Invalid HTTP method: ${httpMethod}`);
        }

        return response;
    } catch (error) {
        throw error;
    }
};
