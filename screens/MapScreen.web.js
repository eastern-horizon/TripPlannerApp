// screens/MapScreen.web.js

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../src/fixLeafletIcons';  // adjust path if needed

export default function MapScreen({ route }) {
    const { tripId } = route.params;

    const waypoints = [
        [34.05, -118.25],
        [36.17, -115.14],
        [39.74, -104.99],
    ];

    return (
        <View style={styles.webContainer}>
            <MapContainer center={waypoints[0]} zoom={5} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Polyline positions={waypoints} pathOptions={{ color: 'blue' }} />
                {waypoints.map((pos, index) => (
                    <Marker key={index} position={pos}>
                        <Popup>Waypoint {index + 1}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </View>
    );
}

const styles = StyleSheet.create({
    webContainer: {
        flex: 1,
        height: '100vh',
        width: '100vw',
    },
});
