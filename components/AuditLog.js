// components/AuditLog.js

import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function AuditLog({ logs }) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Audit Log:</Text>
            <FlatList
                data={logs}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.logItem}>
                        <Text>{item}</Text>
                    </View>
                )}
            />
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
    logItem: {
        borderBottomWidth: 1,
        borderColor: '#eee',
        paddingVertical: 5,
    },
});
