// components/MapView.js

import React, { useState, useEffect } from 'react';
import { Platform, View, Text, Button } from 'react-native';

let MapComponent = ({ coordinates, editable, onSave }) => (
    <View style={{ height: 200, backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' }}>
        <Text>Map not available</Text>
    </View>
);

if (Platform.OS === 'web') {
    const { MapContainer, TileLayer, Polyline, Marker, useMapEvents } = require('react-leaflet');
    const L = require('leaflet');
    require('leaflet/dist/leaflet.css');

    MapComponent = ({ coordinates, editable, onSave }) => {
        const [localCoords, setLocalCoords] = useState(coordinates || []);
        const [selectedIndex, setSelectedIndex] = useState(null);

        useEffect(() => {
            setLocalCoords(coordinates || []);
        }, [coordinates]);

        const addPoint = (e) => {
            const newPoint = { lat: e.latlng.lat, lng: e.latlng.lng };
            setLocalCoords([...localCoords, newPoint]);
        };

        const deleteSelectedPoint = () => {
            if (selectedIndex !== null && selectedIndex >= 0 && selectedIndex < localCoords.length) {
                const updated = [...localCoords];
                updated.splice(selectedIndex, 1);
                setLocalCoords(updated);
                setSelectedIndex(null);
            }
        };

        const DraggableMarker = ({ point, index }) => {
            const [position, setPosition] = useState([point.lat, point.lng]);

            return (
                <Marker
                    position={position}
                    draggable={editable}
                    eventHandlers={{
                        dragend: (e) => {
                            const newPos = e.target.getLatLng();
                            const updated = [...localCoords];
                            updated[index] = { lat: newPos.lat, lng: newPos.lng };
                            setLocalCoords(updated);
                        },
                        click: () => {
                            if (editable) {
                                setSelectedIndex(index);
                                console.log('Selected marker index:', index);
                            }
                        },
                    }}
                />
            );
        };

        const mapCenter = localCoords.length > 0
            ? [localCoords[0].lat, localCoords[0].lng]
            : [39.8283, -98.5795]; // Default: USA center

        const polylinePositions = localCoords.map(coord => [coord.lat, coord.lng]);

        const MapClickHandler = () => {
            useMapEvents({
                click: (e) => {
                    if (editable) addPoint(e);
                },
            });
            return null;
        };

        return (
            <View>
                <MapContainer center={mapCenter} zoom={6} style={{ height: 300, width: '100%', marginVertical: 10 }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Polyline positions={polylinePositions} color="blue" />
                    {editable && <MapClickHandler />}
                    {localCoords.map((point, index) => (
                        <DraggableMarker key={index} point={point} index={index} />
                    ))}
                </MapContainer>

                {editable && (
                    <View style={{ flexDirection: 'column', alignItems: 'center', marginVertical: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginBottom: 10 }}>
                            <Button title="Save Route" onPress={() => onSave(localCoords)} />
                            <Button title="Clear Route" onPress={() => { setLocalCoords([]); setSelectedIndex(null); }} />
                        </View>

                        {selectedIndex !== null && selectedIndex >= 0 && selectedIndex < localCoords.length && (
                            <View style={{ marginBottom: 10 }}>
                                <Text>Selected point #{selectedIndex + 1}</Text>
                                <Button title="Delete Selected Point" onPress={deleteSelectedPoint} />
                            </View>
                        )}
                    </View>
                )}
            </View>
        );
    };
}

export default function MapView({ coordinates, editable, onSave }) {
    return <MapComponent coordinates={coordinates} editable={editable} onSave={onSave} />;
}
