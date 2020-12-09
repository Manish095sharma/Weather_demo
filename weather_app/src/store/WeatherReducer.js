import { API_LOADING, API_ERROR, WEATHER_DATA } from "../actions/actionTypes"

const initialState = {
    weather_Data: [],
    loading: false,
    error: null
};

export default function WeatherReducer(state = initialState, action) {
    switch (action.type) {
        case API_LOADING:
            return {
                ...state,
                loading: true,
                error: null
            };

        case WEATHER_DATA:
            return {
                ...state,
                loading: false,
                error: null,
                weather_Data: action.payload.data
            };

        case API_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                weather_Data: []
            };

        default:
            return state;
    }
}
