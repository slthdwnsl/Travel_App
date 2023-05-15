import axios from "axios";

export const getPlacesData = async (bl_lat, bl_lng, tr_lat, tr_lng, type) => {
    try {
        const {
            data : {data},
        } = await axios.get(
        `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
        {
            params: {
                tr_longitude: tr_lng ? tr_lng : '131.1603000439532',
                tr_latitude: tr_lat ? tr_lat : '38.63399998417842',
                bl_longitude: bl_lng ? bl_lng : '124.5862999535215',
                bl_latitude: bl_lat ? bl_lat : '33.00409996916032',
                currency: 'USD',
                lunit: 'km',
                lang: 'en_US'
                },
                headers: {
                    'X-RapidAPI-Key': '15ac455964msh65820d3c2996c4fp16eb4cjsnc7fafa50fdb8',
                    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
                },
            }
        );

        return data;
    } catch (error) {
        return null;
    }
}