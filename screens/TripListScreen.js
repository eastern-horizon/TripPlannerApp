// screens/TripListScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getDatabase, setupDatabase } from '../src/database/database';

export default function TripListScreen({ navigation }) {
    const db = getDatabase();
    const [trips, setTrips] = useState([]);
    const [refreshFlag, setRefreshFlag] = useState(false);

    const loadTrips = () => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM trips',
                [],
                (_, { rows }) => {
                    console.log('Trips loaded:', rows._array);
                    setTrips(rows._array);
                    setRefreshFlag(flag => !flag);
                }
            );
        });
    };

    const addDummyTrip = () => {
        const now = new Date().toISOString();

        const dummyRoute = JSON.stringify([
            { lat: 34.0522, lng: -118.2437 },
            { lat: 35.1047, lng: -106.6291 },
            { lat: 39.7392, lng: -104.9903 }
        ]);

        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO trips (origin, destination, height, width, length, weight, routeStates, routeCoordinates, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                ['Los Angeles', 'Denver', 14.5, 8.5, 53, 80000, JSON.stringify(["CA", "CO"]), dummyRoute, now],
                () => {
                    console.log('Dummy trip inserted → reloading trips');
                    loadTrips();
                }
            );
        });
    };

    useEffect(() => {
        setupDatabase();
        loadTrips();
    }, []);

    const renderTripItem = ({ item }) => (
        <TouchableOpacity
            style={styles.tripItem}
            onPress={() => navigation.navigate('TripDetail', { tripId: item.id })}
        >
            <Text style={styles.tripTitle}>Trip {item.id}: {item.origin} → {item.destination}</Text>
            <Text style={styles.tripSubtitle}>Height: {item.height} ft  Width: {item.width} ft</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Button title="ADD DUMMY TRIP" onPress={addDummyTrip} />
            <FlatList
                data={trips}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderTripItem}
                extraData={refreshFlag}
                contentContainerStyle={{ padding: 10 }}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No trips yet. Add a trip to get started.</Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#fff',
    },
    tripItem: {
        backgroundColor: '#e0f7fa',
        padding: 12,
        marginBottom: 10,
        borderRadius: 6,
    },
    tripTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    tripSubtitle: {
        fontSize: 14,
        color: '#555',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#888',
    },
});
