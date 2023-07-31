import axios from "axios";

const BASE_URL = 'https://youtube138.p.rapidapi.com'
const options = {

    params: { hl: 'en', gl: 'US' },
    headers: {
        'X-RapidAPI-Key': '482ff4ca4cmsh8119e95043d1cd6p1ccab5jsnaa2391fa66a3',
        'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
};


export const fetchDataFromApi = async (url) => {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options)
    return data
}