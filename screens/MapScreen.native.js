// screens/MapScreen.native.js

import React from 'react';
import { View } from 'react-native';
const MapView = require('react-native-maps').default;
const Polyline = require('react-native-maps').Polyline;
const Marker = require('react-native-maps').Marker;

export default function MapScreen({ route }) {
    const tripId = route?.params?.tripId ?? null;


    const waypoints = [
        { latitude: 34.05, longitude: -118.25 },
        { latitude: 36.17, longitude: -115.14 },
        { latitude: 39.74, longitude: -104.99 },
    ];

    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: waypoints[0].latitude,
                    longitude: waypoints[0].longitude,
                    latitudeDelta: 5,
                    longitudeDelta: 5,
                }}
            >
                <Polyline
                    coordinates={waypoints}
                    strokeColor="#0000FF"
                    strokeWidth={4}
                />
                {waypoints.map((point, index) => (
                    <Marker
                        key={index}
                        coordinate={point}
                        title={`Waypoint ${index + 1}`}
                    />
                ))}
            </MapView>
        </View>
    );
}
