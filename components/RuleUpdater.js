// components/RuleUpdater.js

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function RuleUpdater({ onRuleUpdate }) {
    const [ruleText, setRuleText] = useState('');

    const handleAddRule = () => {
        if (ruleText.trim()) {
            onRuleUpdate(ruleText.trim());
            setRuleText('');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter new rule or update"
                value={ruleText}
                onChangeText={setRuleText}
            />
            <Button title="Add Rule" onPress={handleAddRule} />
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
