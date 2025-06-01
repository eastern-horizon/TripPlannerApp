// screens/RuleBookScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import RuleUpdater from '../components/RuleUpdater';

export default function RuleBookScreen() {
    const [rules, setRules] = useState([]);

    const handleRuleUpdate = (newRule) => {
        setRules([...rules, newRule]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Rule Book Updater</Text>

            <RuleUpdater onRuleUpdate={handleRuleUpdate} />

            <Text style={styles.subtitle}>Current Rules:</Text>
            <FlatList
                data={rules}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.ruleItem}>
                        <Text>{item}</Text>
                    </View>
                )}
            />
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
        fontWeight: 'bold',
    },
    ruleItem: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 5,
    },
});
