// screens/NotificationScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Switch } from 'react-native';
import NotificationSettings from '../components/NotificationSettings';

export default function NotificationScreen({ route }) {
    const tripId = route.params?.tripId || null;


    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    const toggleNotifications = () => {
        setNotificationsEnabled(prev => !prev);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Notification System</Text>
            <Text style={styles.subtitle}>Trip ID: {tripId}</Text>

            <View style={styles.switchRow}>
                <Text style={styles.label}>Enable Notifications:</Text>
                <Switch
                    value={notificationsEnabled}
                    onValueChange={toggleNotifications}
                />
            </View>

            <NotificationSettings enabled={notificationsEnabled} />
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
    switchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    label: {
        marginRight: 10,
    },
});
