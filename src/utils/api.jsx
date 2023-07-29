import axios from "axios";

const BASE_URL = 'https://youtube138.p.rapidapi.com'
const options = {

    params: { hl: 'en', gl: 'US' },
    headers: {
        'X-RapidAPI-Key': '627c77fa4bmshc2de5f7d9f08007p16e4a6jsn1ecf31e75ad6',
        'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
};


export const fetchDataFromApi = async (url) => {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options)
    return data
}