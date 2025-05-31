// screens/MapScreen.js

import React from 'react';
import { View, Text, Platform } from 'react-native';

export default function MapScreen({ route }) {
    const { tripId } = route.params;

    if (Platform.OS === 'web') {
        // Use Leaflet on Web
        const { MapContainer, TileLayer, Marker, Popup, Polyline } = require('react-leaflet');
        const L = require('leaflet');
        require('leaflet/dist/leaflet.css');

        // Dummy waypoints
        const waypoints = [
            [34.05, -118.25], // Los Angeles
            [36.17, -115.14], // Las Vegas
            [39.74, -104.99], // Denver
        ];

        return (
            <View style={{ flex: 1 }}>
                <div style={{ height: '100vh', width: '100%' }}>
                    <MapContainer center={waypoints[0]} zoom={5} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; OpenStreetMap contributors'
                        />
                        <Polyline positions={waypoints} color="blue" />
                        {waypoints.map((pos, index) => (
                            <Marker key={index} position={pos}>
                                <Popup>Waypoint {index + 1}</Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </View>
        );
    }

    // Mobile — use react-native-maps
    const MapView = require('react-native-maps').default;
    const Polyline = require('react-native-maps').Polyline;
    const Marker = require('react-native-maps').Marker;

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
