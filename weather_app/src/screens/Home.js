import React from 'react'
import { View } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import { getWeatherData } from "./src/actions/WeatherAction"
import * as HOC from "./src/components";
const AnimatedSpinner = HOC.AnimatedLoader(View);
export default function Home() {
    const { loading } = useSelector(state => state.weather_data)
    useEffect(() => {
        dispatch(getWeatherData())
    }, [])
    const dispatch = useDispatch();
    return (
        <View style={{ width: "100%", height: "100%" }}>
            <AnimatedSpinner isLoading={loading}>
            </AnimatedSpinner>
        </View>
    )
}
