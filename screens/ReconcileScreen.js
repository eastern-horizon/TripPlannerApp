// screens/ReconcileScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import ReconcileReport from '../components/ReconcileReport';

export default function ReconcileScreen({ route }) {
    const tripId = route?.params?.tripId ?? null;


    const [reportGenerated, setReportGenerated] = useState(false);

    const handleGenerateReport = () => {
        setReportGenerated(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reconcile Engine</Text>
            <Text style={styles.subtitle}>Trip ID: {tripId}</Text>

            <Button title="Generate Reconcile Report" onPress={handleGenerateReport} />

            {reportGenerated && <ReconcileReport tripId={tripId} />}
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
