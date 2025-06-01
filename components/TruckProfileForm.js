// components/TruckProfileForm.js

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function TruckProfileForm({ profile, onSave }) {
    const [localProfile, setLocalProfile] = useState(profile);

    const handleChange = (field, value) => {
        setLocalProfile({ ...localProfile, [field]: value });
    };

    const handleSave = () => {
        onSave(localProfile);
    };

    return (
        <View style={styles.container}>
            {['truckName', 'weight', 'length', 'width', 'height', 'axleCount', 'tireSize', 'groundClearance'].map(field => (
                <TextInput
                    key={field}
                    style={styles.input}
                    placeholder={field.replace(/([A-Z])/g, ' $1')}
                    value={localProfile[field]}
                    onChangeText={(text) => handleChange(field, text)}
                    keyboardType={field === 'weight' || field === 'length' || field === 'width' || field === 'height' || field === 'axleCount' ? 'numeric' : 'default'}
                />
            ))}

            <Button title="Save Truck Profile" onPress={handleSave} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 5,
    },
});
