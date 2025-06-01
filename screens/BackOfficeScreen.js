// screens/BackOfficeScreen.js

import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';

export default function BackOfficeScreen({ navigation }) {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Back Office Modules</Text>

            <Button
                title="Rule Book Updater"
                onPress={() => navigation.navigate('RuleBook')}
            />
            <View style={styles.spacer} />

            <Button
                title="Truck Profile"
                onPress={() => navigation.navigate('TruckProfile')}
            />
            <View style={styles.spacer} />

            <Button
                title="Audit Engine"
                onPress={() => navigation.navigate('Audit')}
            />
            <View style={styles.spacer} />

            <Button
                title="Notification System"
                onPress={() => navigation.navigate('Notification')}
            />
            <View style={styles.spacer} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    spacer: {
        height: 15,
    },
});
