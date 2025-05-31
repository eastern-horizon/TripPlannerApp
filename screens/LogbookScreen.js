// screens/LogbookScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button } from 'react-native';
import { getDatabase } from '../src/database/database';

export default function LogbookScreen({ route }) {
    const { tripId } = route.params;
    const [logEntries, setLogEntries] = useState([]);
    const [eventType, setEventType] = useState('');
    const [notes, setNotes] = useState('');

    useEffect(() => {
        loadLogEntries();
    }, []);

    const loadLogEntries = () => {
        const db = getDatabase();
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM logbook WHERE trip_id = ? ORDER BY timestamp DESC;',
                [tripId],
                (_, { rows: { _array } }) => {
                    setLogEntries(_array);
                }
            );
        });
    };

    const addLogEntry = () => {
        if (!eventType) return;

        const db = getDatabase();
        const timestamp = new Date().toISOString();

        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO logbook (trip_id, event_type, timestamp, notes)
                 VALUES (?, ?, ?, ?);`,
                [tripId, eventType, timestamp, notes],
                () => {
                    setEventType('');
                    setNotes('');
                    loadLogEntries();
                }
            );
        });
    };

    const renderItem = ({ item }) => (
        <View style={{ padding: 12, borderBottomWidth: 1 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.event_type} @ {item.timestamp}</Text>
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
