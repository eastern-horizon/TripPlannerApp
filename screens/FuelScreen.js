// screens/FuelScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import FuelEntryForm from '../components/FuelEntryForm';

export default function FuelScreen({ route }) {
    const tripId = route?.params?.tripId ?? null;


    const [fuelEntries, setFuelEntries] = useState([]);

    const handleAddFuelEntry = (entry) => {
        setFuelEntries([...fuelEntries, entry]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Fuel Planner</Text>
            <Text style={styles.subtitle}>Trip ID: {tripId}</Text>

            <FuelEntryForm onAddEntry={handleAddFuelEntry} />

            <Text style={styles.subtitle}>Fuel Entries:</Text>
            <FlatList
                data={fuelEntries}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.entryItem}>
                        <Text>{item.date} - {item.gallons} gal @ {item.location}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    subtitle: {
        marginVertical: 10,
        fontWeight: 'bold',
    },
    entryItem: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 5,
    },
});
