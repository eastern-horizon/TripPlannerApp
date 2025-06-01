// screens/AuditScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import AuditLog from '../components/AuditLog';

export default function AuditScreen({ route }) {
    const tripId = route.params?.tripId || null;


    const [auditLogs, setAuditLogs] = useState([]);

    const handleAddAuditLog = () => {
        const newLog = `Audit Entry - ${new Date().toLocaleString()}`;
        setAuditLogs([...auditLogs, newLog]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Audit Engine</Text>
            <Text style={styles.subtitle}>Trip ID: {tripId}</Text>

            <Button title="Add Dummy Audit Log" onPress={handleAddAuditLog} />

            <AuditLog logs={auditLogs} />
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
