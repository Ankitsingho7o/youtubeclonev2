import axios from "axios";

const BASE_URL = 'https://youtube138.p.rapidapi.com'
const options = {

    params: { regionCode: 'IN',
    maxResults: '50', 
    },
    headers: {
        'X-RapidAPI-Key': '141c3dc2a9msh7816d5c6a3c813ap1b3a18jsna3f88cabfe0c',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
};


export const fetchDataFromApi = async (url) => {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options)
    return data
}