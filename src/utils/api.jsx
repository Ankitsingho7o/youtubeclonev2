import axios from "axios";

const BASE_URL = 'https://youtube138.p.rapidapi.com'
const options = {

    params: { regionCode: 'IN',
    maxResults: '50', 
    },
    headers: {
        'X-RapidAPI-Key': '1126d9bfc4msh7dbfdf30c08d2d4p1026e8jsna50de9bb9750',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
};


export const fetchDataFromApi = async (url) => {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options)
    return data
}