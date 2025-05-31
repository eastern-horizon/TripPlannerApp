// screens/TripListScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity } from 'react-native';
import { getDatabase, setupDatabase } from '../src/database/database';

export default function TripListScreen({ navigation }) {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        setupDatabase();
        loadTrips();
    }, []);

    const loadTrips = () => {
        const db = getDatabase();
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM trips;',
                [],
                (_, { rows: { _array } }) => {
                    setTrips(_array);
                }
            );
        });
    };

    const addDummyTrip = () => {
        const db = getDatabase();
        const now = new Date().toISOString();
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO trips (origin, destination, height, width, length, weight, routeStates, created_at)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
                ["Los Angeles", "Denver", 14.5, 8.5, 60, 80000, JSON.stringify(["CA", "NV", "CO"]), now],
                () => {
                    loadTrips();
                }
            );
        });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('TripDetail', { tripId: item.id })}>
            <View style={{ padding: 16, borderBottomWidth: 1 }}>
                <Text>Trip {item.id}: {item.origin} → {item.destination}</Text>
                <Text>Height: {item.height} ft, Width: {item.width} ft</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Button title="Add Dummy Trip" onPress={addDummyTrip} />
            <FlatList
                data={trips}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
            />
        </View>
    );
}
