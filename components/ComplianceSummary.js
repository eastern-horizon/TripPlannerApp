// components/ComplianceSummary.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ComplianceSummary({ status }) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Compliance Status:</Text>
            <Text style={styles.status}>{status}</Text>
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
    status: {
        marginTop: 5,
        fontSize: 16,
    },
});
