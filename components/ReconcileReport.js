// components/ReconcileReport.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ReconcileReport({ tripId }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reconcile Report</Text>
            <Text style={styles.subtitle}>Trip ID: {tripId}</Text>

            <Text style={styles.section}>Planned vs Actual:</Text>
            <Text>- Planned Hours: 40</Text>
            <Text>- Actual Hours: 42</Text>

            <Text style={styles.section}>Permits vs Route:</Text>
            <Text>- Permit Route OK</Text>

            <Text style={styles.section}>Fuel Usage:</Text>
            <Text>- Planned MPG: 6.5</Text>
            <Text>- Actual MPG: 6.2</Text>
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
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    subtitle: {
        marginVertical: 5,
    },
    section: {
        marginTop: 10,
        fontWeight: 'bold',
    },
});
