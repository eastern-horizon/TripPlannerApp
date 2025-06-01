// screens/TruckProfileScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TruckProfileForm from '../components/TruckProfileForm';

export default function TruckProfileScreen() {
    const [profile, setProfile] = useState({
        truckName: '',
        weight: '',
        length: '',
        width: '',
        height: '',
        axleCount: '',
        tireSize: '',
        groundClearance: '',
    });

    const handleSaveProfile = (newProfile) => {
        setProfile(newProfile);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Truck Profile</Text>

            <TruckProfileForm profile={profile} onSave={handleSaveProfile} />
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
});
