import React, { useEffect, useRef } from 'react'
import LottieView from 'lottie-react-native';
import { View } from 'react-native';

export default function AnimatedLoader() {
    const animation = useRef(null)
    useEffect(() => {
        animation.current.play();

    }, [])
    return (

        <View style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
            <LottieView
                style={{ width: "40%", height: "70%", alignSelf: "center", }}
                ref={animation}
                source={require('../assets/loader.json')}
            />
        </View>
    )
}
