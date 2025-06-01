// components/FuelEntryForm.js

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function FuelEntryForm({ onAddEntry }) {
    const [location, setLocation] = useState('');
    const [gallons, setGallons] = useState('');

    const handleAdd = () => {
        const newEntry = {
            date: new Date().toLocaleDateString(),
            location: location.trim(),
            gallons: parseFloat(gallons),
        };

        if (newEntry.location && !isNaN(newEntry.gallons)) {
            onAddEntry(newEntry);
            setLocation('');
            setGallons('');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Location"
                value={location}
                onChangeText={setLocation}
            />
            <TextInput
                style={styles.input}
                placeholder="Gallons"
                keyboardType="numeric"
                value={gallons}
                onChangeText={setGallons}
            />
            <Button title="Add Fuel Entry" onPress={handleAdd} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 5,
    },
});
