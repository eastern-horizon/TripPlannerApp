// components/MapView.js

import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Button, Platform } from 'react-native';

const L = require('leaflet');

export default function MapView({ coordinates, editable, onSave }) {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const markerLayer = useRef(null);
    const polylineLayer = useRef(null);

    const [localCoords, setLocalCoords] = useState([]);

    // Sync with prop
    useEffect(() => {
        if (Array.isArray(coordinates)) {
            const safe = coordinates.filter(c =>
                typeof c.lat === 'number' && typeof c.lng === 'number'
            );
            setLocalCoords(safe);
        } else {
            console.warn('MapView received bad coordinates → defaulting to []');
            setLocalCoords([]);
        }
    }, [coordinates]);

    // Init map
    useEffect(() => {
        if (Platform.OS === 'web') {
            if (!mapRef.current) return;
            if (mapInstance.current) return;

            mapInstance.current = L.map(mapRef.current).setView([39.5, -98.35], 4);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors',
            }).addTo(mapInstance.current);
        }
    }, []);

    // Render polyline + markers
    useEffect(() => {
        if (Platform.OS !== 'web') return;
        if (!mapInstance.current) return;

        // Clear layers
        if (polylineLayer.current) {
            mapInstance.current.removeLayer(polylineLayer.current);
            polylineLayer.current = null;
        }

        if (markerLayer.current) {
            mapInstance.current.removeLayer(markerLayer.current);
            markerLayer.current = null;
        }

        const safeCoords = Array.isArray(localCoords) ? localCoords : [];

        if (safeCoords.length === 0) return;

        // Polyline
        polylineLayer.current = L.polyline(
            safeCoords.map(coord => [coord.lat, coord.lng]),
            { color: 'blue' }
        ).addTo(mapInstance.current);

        mapInstance.current.fitBounds(polylineLayer.current.getBounds(), { padding: [20, 20] });

        // Markers if editable
        if (editable) {
            markerLayer.current = L.layerGroup();

            safeCoords.forEach((coord, index) => {
                const marker = L.marker([coord.lat, coord.lng], { draggable: true });

                marker.on('dragend', (e) => {
                    const newLatLng = e.target.getLatLng();
                    const updatedCoords = [...safeCoords];
                    updatedCoords[index] = { lat: newLatLng.lat, lng: newLatLng.lng };
                    setLocalCoords(updatedCoords);
                });

                markerLayer.current.addLayer(marker);
            });

            markerLayer.current.addTo(mapInstance.current);
        }
    }, [localCoords, editable]);

    const handleSave = () => {
        if (onSave) {
            console.log('MapView → Saving coordinates:', localCoords);
            onSave(localCoords);
        }
    };

    return (
        <View style={styles.container}>
            {Platform.OS === 'web' ? (
                <>
                    <div ref={mapRef} style={styles.map} />
                    {editable && (
                        <Button title="Save Map Edits" onPress={handleSave} />
                    )}
                </>
            ) : (
                <View>
                    <View style={styles.mobilePlaceholder}>
                        <Button title="Map not supported on Mobile yet" onPress={() => { }} disabled />
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginBottom: 20,
    },
    map: {
        height: 400,
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    mobilePlaceholder: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
