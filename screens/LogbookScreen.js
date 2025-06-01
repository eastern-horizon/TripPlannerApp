// screens/LogbookScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button } from 'react-native';
import { setupDatabase, getLogEntries, insertLogEntry } from '../src/database/database';

export default function LogbookScreen({ route }) {
    const tripId = route?.params?.tripId ?? null;

    const [logEntries, setLogEntries] = useState([]);
    const [eventType, setEventType] = useState('');
    const [notes, setNotes] = useState('');

    useEffect(() => {
        setupDatabase();
        loadLogEntries();
    }, []);

    const loadLogEntries = async () => {
        const entries = await getLogEntries(tripId);
        console.log('Loaded log entries:', entries);
        setLogEntries(entries);
    };

    const addLogEntry = async () => {
        if (!eventType) return;

        const timestamp = new Date().toISOString();

        await insertLogEntry({
            tripId,
            eventType,
            timestamp,
            notes
        });

        setEventType('');
        setNotes('');
        loadLogEntries();
    };

    const renderItem = ({ item }) => (
        <View style={{ padding: 12, borderBottomWidth: 1 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.eventType} @ {item.timestamp}</Text>
            <Text>{item.notes}</Text>
        </View>
    );

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Trip {tripId} Logbook</Text>

            <View style={{ marginVertical: 12 }}>
                <Text>Event Type:</Text>
                <TextInput
                    style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
                    value={eventType}
                    onChangeText={setEventType}
                    placeholder="e.g. Fuel Stop, Delay, Escort"
                />

                <Text>Notes:</Text>
                <TextInput
                    style={{ borderWidth: 1, padding: 8 }}
                    value={notes}
                    onChangeText={setNotes}
                    placeholder="Additional notes (optional)"
                />

                <Button title="Add Log Entry" onPress={addLogEntry} />
            </View>

            <FlatList
                data={logEntries}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
            />
        </View>
    );
}
