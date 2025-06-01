// components/HOSClock.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HOSClock({ hosState }) {
    const [clock, setClock] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setClock(prev => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [hosState]);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Current HOS State:</Text>
            <Text style={styles.state}>{hosState}</Text>

            <Text style={styles.clock}>Clock: {Math.floor(clock / 60)} min {clock % 60} sec</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    label: {
        fontWeight: 'bold',
    },
    state: {
        marginTop: 5,
        fontSize: 16,
    },
    clock: {
        marginTop: 10,
        fontSize: 16,
        color: 'green',
    },
});
