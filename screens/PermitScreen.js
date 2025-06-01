// screens/PermitScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PermitUploader from '../components/PermitUploader';

export default function PermitScreen({ route }) {
    const tripId = route?.params?.tripId ?? null;


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Permit Engine</Text>
            <Text style={styles.subtitle}>Trip ID: {tripId}</Text>

            <PermitUploader tripId={tripId} />
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
