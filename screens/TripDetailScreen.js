// screens/TripDetailScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, ScrollView } from 'react-native';
import { getDatabase, setupDatabase } from '../src/database/database';
import MapView from '../components/MapView';
import Constants from 'expo-constants';
import { fetchRouteFromORS, geocodeAddress } from '../utils/ors';

export default function TripDetailScreen({ route }) {
    const { tripId } = route.params;
    const db = getDatabase();
    const [trip, setTrip] = useState(null);
    const [editMode, setEditMode] = useState(false);

    // Editable Origin/Destination
    const [originInput, setOriginInput] = useState('');
    const [destinationInput, setDestinationInput] = useState('');

    // Error display
    const [routeError, setRouteError] = useState('');

    // Routing provider dropdown
    const [routingProvider, setRoutingProvider] = useState('ORS');

    const loadTrip = () => {
    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM trips WHERE id = ?;',
            [tripId],
            (_, { rows }) => {
                if (rows.length > 0) {
                    const row = rows._array[0];
                    console.log('Trip loaded:', row);

                    // Safe parse routeStates
                    let routeStates = [];
                    try {
                        if (typeof row.routeStates === 'string' && row.routeStates.trim() !== '') {
                            routeStates = JSON.parse(row.routeStates);
                            if (!Array.isArray(routeStates)) {
                                throw new Error('routeStates not array');
                            }
                        }
                    } catch (e) {
                        console.warn('Failed to parse routeStates — defaulting to empty []');
                        routeStates = [];
                    }

                    // Safe parse routeCoordinates
                    let routeCoordinates = [];
                    try {
                        if (typeof row.routeCoordinates === 'string' && row.routeCoordinates.trim() !== '') {
                            routeCoordinates = JSON.parse(row.routeCoordinates);
                            if (!Array.isArray(routeCoordinates)) {
                                throw new Error('routeCoordinates not array');
                            }
                        }
                    } catch (e) {
                        console.warn('Failed to parse routeCoordinates — defaulting to empty []');
                        routeCoordinates = [];
                    }

                    // Set trip state
                    setTrip({
                        ...row,
                        routeStates: routeStates,
                        routeCoordinates: routeCoordinates
                    });

                    // Initialize input fields
                    setOriginInput(row.origin);
                    setDestinationInput(row.destination);
                } else {
                    console.warn('Trip not found with ID:', tripId);
                }
            }
        );
    });
};


   const saveTripInfo = () => {
    console.log('Saving trip info:', originInput, destinationInput);

    // Validation
    const trimmedOrigin = originInput.trim();
    const trimmedDestination = destinationInput.trim();

    if (trimmedOrigin === '' || trimmedDestination === '') {
        console.warn('Origin or Destination is empty — NOT saving.');
        alert('Please enter both Origin and Destination.');
        return;
    }

    db.transaction(tx => {
        tx.executeSql(
            'UPDATE trips SET origin = ?, destination = ? WHERE id = ?;',
            [trimmedOrigin, trimmedDestination, tripId],
            () => {
                console.log('Trip info saved');
                loadTrip();
            }
        );
    });
};


    const saveRoute = (newRouteCoordinates) => {
    console.log('Saving new routeCoordinates:', newRouteCoordinates);

    // Validate before saving
    let safeRouteCoordinates = [];

    try {
        if (Array.isArray(newRouteCoordinates)) {
            safeRouteCoordinates = newRouteCoordinates.map(coord => {
                if (typeof coord.lat === 'number' && typeof coord.lng === 'number') {
                    return { lat: coord.lat, lng: coord.lng };
                } else {
                    throw new Error('Invalid coordinate object');
                }
            });
        } else {
            throw new Error('newRouteCoordinates is not an array');
        }
    } catch (err) {
        console.error('Failed to validate routeCoordinates:', err);
        console.warn('Saving empty routeCoordinates instead.');
        safeRouteCoordinates = [];
    }

    // Save
    db.transaction(tx => {
        tx.executeSql(
            'UPDATE trips SET routeCoordinates = ? WHERE id = ?;',
            [JSON.stringify(safeRouteCoordinates), tripId],
            () => {
                console.log('Route saved');
                loadTrip();
                setEditMode(false);
            }
        );
    });
};


    const generateRoute = async () => {
        if (!trip) return;

        setRouteError(''); // clear previous error

        try {
            const apiKey = Constants.expoConfig.extra.ORS_API_KEY;

            // Geocode origin
            const originLatLng = await geocodeAddress(originInput, apiKey);
            if (!originLatLng) {
                throw new Error(`Failed to geocode origin: ${originInput}`);
            }

            // Geocode destination
            const destinationLatLng = await geocodeAddress(destinationInput, apiKey);
            if (!destinationLatLng) {
                throw new Error(`Failed to geocode destination: ${destinationInput}`);
            }

            console.log('Using routing provider:', routingProvider);

            if (routingProvider === 'ORS') {
                const newRoute = await fetchRouteFromORS(originLatLng, destinationLatLng, apiKey);
                if (newRoute.length > 0) {
                    saveRoute(newRoute);
                } else {
                    throw new Error('ORS returned empty route.');
                }
            } else if (routingProvider === 'Mapbox') {
                throw new Error('Mapbox routing not implemented yet.');
            } else if (routingProvider === 'Google') {
                throw new Error('Google routing not implemented yet.');
            }

        } catch (err) {
            console.error('Failed to fetch route:', err);
            setRouteError(err.message);
        }
    };

    useEffect(() => {
        setupDatabase();
        loadTrip();
    }, [tripId]);

    if (!trip) {
        return (
            <View style={styles.container}>
                <Text>Loading trip details...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Trip {trip.id}</Text>

            {/* Editable Origin */}
            <Text>Origin:</Text>
            <TextInput
                style={styles.input}
                value={originInput}
                onChangeText={setOriginInput}
                placeholder="Enter origin"
            />

            {/* Editable Destination */}
            <Text>Destination:</Text>
            <TextInput
                style={styles.input}
                value={destinationInput}
                onChangeText={setDestinationInput}
                placeholder="Enter destination"
            />

            <Button title="Save Trip Info" onPress={saveTripInfo} />

            <View style={{ height: 20 }} />

            {/* Other trip details */}
            <Text>Height: {trip.height} ft</Text>
            <Text>Width: {trip.width} ft</Text>
            <Text>Length: {trip.length} ft</Text>
            <Text>Weight: {trip.weight} lbs</Text>
            <Text>
                Route States:{' '}
                {Array.isArray(trip.routeStates) ? trip.routeStates.join(', ') : ''}
            </Text>
            <Text>Created At: {trip.created_at}</Text>

            <View style={{ height: 20 }} />

            <Button
                title={editMode ? 'Exit Edit Map' : 'Edit Map'}
                onPress={() => setEditMode(!editMode)}
            />

            <View style={{ height: 10 }} />

            {/* Routing Provider Dropdown */}
            <Text style={{ marginTop: 20 }}>Routing Provider:</Text>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <Button
                    title="ORS"
                    onPress={() => setRoutingProvider('ORS')}
                    color={routingProvider === 'ORS' ? 'blue' : 'gray'}
                />
                <View style={{ width: 10 }} />
                <Button
                    title="Mapbox"
                    onPress={() => setRoutingProvider('Mapbox')}
                    color={routingProvider === 'Mapbox' ? 'blue' : 'gray'}
                />
                <View style={{ width: 10 }} />
                <Button
                    title="Google"
                    onPress={() => setRoutingProvider('Google')}
                    color={routingProvider === 'Google' ? 'blue' : 'gray'}
                />
            </View>

            <Button
                title="Generate Route"
                onPress={generateRoute}
            />

            {/* Show routing error if any */}
            {routeError !== '' && (
                <Text style={{ color: 'red', marginTop: 10 }}>
                    ⚠️ Routing error: {routeError}
                </Text>
            )}

            {/* Map View */}
            <MapView
                coordinates={trip.routeCoordinates}
                editable={editMode}
                onSave={saveRoute}
            />

            <View style={{ height: 50 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
});
