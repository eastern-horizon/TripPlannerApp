// screens/HOSScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import HOSClock from '../components/HOSClock';

export default function HOSScreen({ route }) {
    const tripId = route?.params?.tripId ?? null;


    const [hosState, setHosState] = useState('Off Duty');

    const handleToggleState = () => {
        const nextState = hosState === 'Driving' ? 'On Duty' :
                          hosState === 'On Duty' ? 'Off Duty' :
                          'Driving';
        setHosState(nextState);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>HOS Tracker</Text>
            <Text style={styles.subtitle}>Trip ID: {tripId}</Text>

            <HOSClock hosState={hosState} />

            <Button title="Toggle HOS State" onPress={handleToggleState} />
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
    },
});
