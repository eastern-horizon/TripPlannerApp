// components/NotificationSettings.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NotificationSettings({ enabled }) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Notification Settings:</Text>

            {enabled ? (
                <View>
                    <Text>- Permit Window Alerts: ON</Text>
                    <Text>- HOS Alerts: ON</Text>
                    <Text>- Fuel Stop Reminders: ON</Text>
                </View>
            ) : (
                <Text>Notifications are DISABLED</Text>
            )}
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
});
