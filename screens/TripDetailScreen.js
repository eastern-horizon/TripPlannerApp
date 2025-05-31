// screens/TripDetailScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { getDatabase, setupDatabase } from '../src/database/database';
import MapView from '../components/MapView';

export default function TripDetailScreen({ route }) {
    const { tripId } = route.params;
    const db = getDatabase();
    const [trip, setTrip] = useState(null);
    const [editMode, setEditMode] = useState(false);

    const loadTrip = () => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM trips WHERE id = ?;',
                [tripId],
                (_, { rows }) => {
                    if (rows.length > 0) {
                        const row = rows._array[0];
                        console.log('Trip loaded:', row);

                        let routeStates = [];
                        try {
                            routeStates = JSON.parse(row.routeStates);
                        } catch (e) {
                            console.warn('Failed to parse routeStates:', row.routeStates);
                            routeStates = [];
                        }

                        let routeCoordinates = [];
                        try {
                            routeCoordinates = JSON.parse(row.routeCoordinates);
                        } catch (e) {
                            console.warn('Failed to parse routeCoordinates:', row.routeCoordinates);
                            routeCoordinates = [];
                        }

                        setTrip({
                            ...row,
                            routeStates: routeStates,
                            routeCoordinates: routeCoordinates
                        });
                    } else {
                        console.warn('Trip not found with ID:', tripId);
                    }
                }
            );
        });
    };

    const saveRoute = (newRouteCoordinates) => {
        console.log('Saving new routeCoordinates:', newRouteCoordinates);
        db.transaction(tx => {
            tx.executeSql(
                'UPDATE trips SET routeCoordinates = ? WHERE id = ?;',
                [JSON.stringify(newRouteCoordinates), tripId],
                () => {
                    console.log('Route saved');
                    loadTrip();
                    setEditMode(false);
                }
            );
        });
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
        <View style={styles.container}>
            <Text style={styles.title}>Trip {trip.id}</Text>
            <Text>Origin: {trip.origin}</Text>
            <Text>Destination: {trip.destination}</Text>
            <Text>Height: {trip.height} ft</Text>
            <Text>Width: {trip.width} ft</Text>
            <Text>Length: {trip.length} ft</Text>
            <Text>Weight: {trip.weight} lbs</Text>
            <Text>Route States: {trip.routeStates.join(', ')}</Text>
            <Text>Created At: {trip.created_at}</Text>

            <Button
                title={editMode ? 'Exit Edit Map' : 'Edit Map'}
                onPress={() => setEditMode(!editMode)}
            />

            {/* Map below */}
            <MapView
                coordinates={trip.routeCoordinates}
                editable={editMode}
                onSave={saveRoute}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});
