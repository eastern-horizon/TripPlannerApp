// screens/TripDetailScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { getDatabase } from '../src/database/database';
import { getRequiredPermits } from '../utils/permitEngine';
import { calculateRemainingHOS, getMaxDrivingHours } from '../utils/hosClock';

export default function TripDetailScreen({ route, navigation }) {
    const { tripId } = route.params;
    const [trip, setTrip] = useState(null);
    const [permits, setPermits] = useState([]);
    const [hosRemaining, setHosRemaining] = useState(getMaxDrivingHours());

    useEffect(() => {
        loadTrip();
    }, []);

    const loadTrip = () => {
        const db = getDatabase();
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM trips WHERE id = ?;',
                [tripId],
                (_, { rows: { _array } }) => {
                    if (_array.length > 0) {
                        const t = _array[0];
                        setTrip(t);
                        const tripObj = {
                            height: t.height,
                            width: t.width,
                            routeStates: JSON.parse(t.routeStates || "[]")
                        };
                        const requiredPermits = getRequiredPermits(tripObj);
                        setPermits(requiredPermits);
                    }
                }
            );
        });
    };

    const simulateDriving = () => {
        // Example: simulate driving 2 hours (120 mins)
        const simulatedMinutes = 120;
        const remaining = calculateRemainingHOS(Date.now(), simulatedMinutes);
        setHosRemaining(remaining);
    };

    if (!trip) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading trip...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={{ flex: 1, padding: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                Trip {trip.id}: {trip.origin} → {trip.destination}
            </Text>
            <Text>Height: {trip.height} ft</Text>
            <Text>Width: {trip.width} ft</Text>
            <Text>States: {JSON.parse(trip.routeStates || "[]").join(', ')}</Text>

            <View style={{ marginTop: 16 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Required Permits:</Text>
                {permits.map((p, index) => (
                    <Text key={index}>• {p}</Text>
                ))}
            </View>

            <View style={{ marginTop: 16 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>HOS Clock:</Text>
                <Text>Remaining Hours: {hosRemaining.toFixed(2)} hrs</Text>
                <Button title="Simulate 2 hours driving" onPress={simulateDriving} />
            </View>

            <View style={{ marginTop: 16 }}>
                <Button title="View Route Map" onPress={() => navigation.navigate('MapScreen', { tripId })} />
                <Button title="View Logbook" onPress={() => navigation.navigate('LogbookScreen', { tripId })} />
            </View>
        </ScrollView>
    );
}
