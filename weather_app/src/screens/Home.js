import React, { useEffect, useState } from 'react'
import { View, FlatList, StyleSheet, Platform, PermissionsAndroid, Text, Dimensions, Pressable } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import { getWeatherData, getFailure } from "../actions/WeatherAction"
import * as HOC from "../components";
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';

const AnimatedSpinner = HOC.AnimatedLoader(View);
export default function Home() {
    const { loading, weather_Data, error } = useSelector(state => state.weather_data)
    const [cityName, setcityName] = useState('')
    const dispatch = useDispatch();

    useEffect(() => {
        const requestLocationPermission = async () => {
            if (Platform.OS === 'ios') {
                getOneTimeLocation();
            } else {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: 'Location Access Required',
                            message: 'This App needs to Access your location',
                        },
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {

                        getOneTimeLocation();
                    } else {
                        dispatch(getFailure("Permission Denied"))
                        console.log("Denied")
                    }
                } catch (err) {
                    console.warn(err);
                }
            }
        };
        requestLocationPermission();

    }, []);






    function getCurrentCity(position) {

        Geocoder.init("AIzaSyDzVB0DIkXDJwusvl8L2bSU_-j14mD3PeY");

        Geocoder.from(position.coords.latitude, position.coords.longitude)

            .then(json => {
                try {
                    let addressComponent = json.results[0].address_components[3].long_name;
                    setcityName(addressComponent)
                }
                catch (e) {
                    dispatch(getFailure(e.message))

                }




            })

            .catch(error =>
                dispatch(getFailure(error.message))


            );
    }
    const getOneTimeLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                getCurrentCity(position)
                dispatch(getWeatherData(position))

            },
            (error) => {
                dispatch(getFailure(error.message))
            }
        );
    };


    function getDayOfWeek(date) {
        const dayOfWeek = new Date(date * 1000).getDay();
        return isNaN(dayOfWeek) ? null :
            ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
    }

    function handleButton() {
        getOneTimeLocation()

    }


    return (



        <View style={styles.rootContainer}>
            {
                error ? <View style={styles.errorContainer}>
                    <Text style={[styles.headerText, { textAlign: "center", flexWrap: "wrap" }]}>
                        Something went wrong on Our End
                    </Text>
                    <Pressable onPress={handleButton} style={styles.errorButton} >
                        <Text>Retry</Text>
                    </Pressable>
                </View> :

                    <AnimatedSpinner style={{ flex: 1 }} isLoading={loading}>
                        <View style={styles.topContainer}>
                            <Text style={styles.headerText}> {`${weather_Data.current ? weather_Data.current.temp : "0"} \u2103`} </Text>
                            <Text style={styles.headerText}> {cityName} </Text>
                        </View>

                        <View style={styles.bottomContainder} >
                            <FlatList data={weather_Data.daily}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => {
                                    if (index >= 1 && index <= 5) {
                                        return <View style={styles.subItemContainer}>
                                            <Text style={styles.itemText}>{getDayOfWeek(item.dt)}</Text>
                                            <Text style={styles.itemText}>{`${item.temp.day} \u2103`}</Text>
                                        </View>
                                    }
                                }}></FlatList>

                        </View>

                    </AnimatedSpinner>

            }
        </View>
    )
}

const styles = StyleSheet.create({

    rootContainer: {
        width: "100%",
        height: "100%"
    },
    topContainer: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center"
    },
    bottomContainder: {
        flex: 0.5,
    },
    headerText: {
        fontSize: 25, fontWeight: "bold"
    },
    itemText: {
        fontWeight: "600", fontSize: 18
    },
    subItemContainer: {
        width: "100%",
        justifyContent: "space-between",
        borderColor: "black",
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5, flexDirection: "row",
        height: Dimensions.get("screen").height / 12,
        alignItems: "center",
        paddingHorizontal: 10
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
        alignSelf: "center"
    },
    errorButton: {
        borderColor: "black",
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginTop: 30
    }


})
