// components/PermitUploader.js

import React from 'react';
import { View, Button, Alert } from 'react-native';

export default function PermitUploader({ tripId }) {
    const handleDummyUpload = () => {
        Alert.alert('Permit Uploaded', `Dummy permit for trip ${tripId}`);
    };

    return (
        <View style={{ marginVertical: 10 }}>
            <Button title="Upload Permit (Dummy)" onPress={handleDummyUpload} />
        </View>
    );
}
