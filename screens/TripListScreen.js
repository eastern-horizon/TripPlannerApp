// screens/TripListScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { setupDatabase, getAllTrips, insertTrip } from '../src/database/database';

export default function TripListScreen({ navigation }) {
    const [trips, setTrips] = useState([]);
    const [refreshFlag, setRefreshFlag] = useState(false);

    const loadTrips = async () => {
        const rows = await getAllTrips();
        console.log('Trips loaded:', rows);
        setTrips(rows);
        setRefreshFlag(flag => !flag);
    };

    const addDummyTrip = async () => {
        const now = new Date().toISOString();

        const dummyRoute = [
            { lat: 34.0522, lng: -118.2437 },
            { lat: 35.1047, lng: -106.6291 },
            { lat: 39.7392, lng: -104.9903 }
        ];

        const newTrip = {
            origin: 'Los Angeles',
            destination: 'Denver',
            height: 14.5,
            width: 8.5,
            length: 53,
            weight: 80000,
            routeStates: JSON.stringify(["CA", "CO"]),
            routeCoordinates: JSON.stringify(dummyRoute),
            created_at: now
        };

        await insertTrip(newTrip);
        console.log('Dummy trip inserted → reloading trips');
        loadTrips();
    };

    const clearAllTrips = () => {
        Alert.alert(
            'Clear All Trips',
            'Are you sure you want to delete ALL trips?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Yes, Clear All',
                    style: 'destructive',
                    onPress: () => {
                        // Clear trips in memory (safe for InMemoryDB)
                        trips.splice(0, trips.length);
                        console.log('All trips cleared!');
                        loadTrips();
                    }
                }
            ]
        );
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

            <View style={{ height: 10 }} />

            <Button
                title="Go to Main Menu"
                onPress={() => navigation.navigate('MainLanding')}
            />

            <View style={{ height: 10 }} />

            <Button
                title="Settings"
                onPress={() => navigation.navigate('Settings')}
            />

            <View style={{ height: 10 }} />

            <Button
                title="Clear All Trips"
                color="red"
                onPress={clearAllTrips}
            />

            <View style={{ height: 20 }} />

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
