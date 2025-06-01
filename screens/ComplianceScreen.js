// screens/ComplianceScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import ComplianceSummary from '../components/ComplianceSummary';

export default function ComplianceScreen({ route }) {
   const tripId = route?.params?.tripId ?? null;


    const [complianceStatus, setComplianceStatus] = useState('Unknown');

    const handleCheckCompliance = () => {
        // Dummy compliance check
        setComplianceStatus('Compliant 🚛✅');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Compliance Tracker</Text>
            <Text style={styles.subtitle}>Trip ID: {tripId}</Text>

            <Button title="Check Compliance" onPress={handleCheckCompliance} />

            <ComplianceSummary status={complianceStatus} />
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
