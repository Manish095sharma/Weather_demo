import { combineReducers } from "redux";
import WeatherReducer from "../store/WeatherReducer"

export default combineReducers({
    weather_data: WeatherReducer
});
