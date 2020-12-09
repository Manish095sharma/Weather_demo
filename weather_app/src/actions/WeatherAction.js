import {
    API_ERROR,
    API_LOADING,
    WEATHER_DATA
} from "./actionTypes";
import { create } from 'apisauce'

const api = create({
    baseURL: 'http://api.openweathermap.org',
})


const apiLoading = () => ({
    type: API_LOADING
});

const getSucessData = data => ({
    type: WEATHER_DATA,
    payload: { data }
});

const getFailure = error => ({
    type: API_ERROR,
    payload: { error }
});

export const getWeatherData = () => {
    return async dispatch => {
        dispatch(apiLoading());
        try {
            setTimeout(async () => { //settimeout used for showing loader some time
                const res = await api.get("/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly&appid=cace2521f2edbc91e01e64132eb2c354");
                return dispatch(getSucessData(res.data));
            }, 3000)

        } catch (err) {
            return dispatch(getFailure(err.message));
        }

    };
}



