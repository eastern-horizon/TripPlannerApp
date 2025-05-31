// src/database/database.js

import { Platform } from 'react-native';

let db = null;

if (Platform.OS === 'web') {
    console.log('Running on Web — using in-memory mock database.');

    // Simple in-memory mock database:
    class InMemoryDB {
        constructor() {
            this.tables = {
                trips: [],
                permits: [],
                logbook: [],
            };
        }

        transaction(callback) {
            // Call the callback immediately with a mock tx object:
            callback({
                executeSql: (sql, params, onSuccess) => {
                    console.warn('InMemoryDB: executeSql called:', sql, params);

                    // VERY basic handling for SELECT * FROM trips
                    if (sql.startsWith('SELECT * FROM trips')) {
                        onSuccess({}, { rows: { _array: this.tables.trips } });
                    } else if (sql.startsWith('SELECT * FROM permits WHERE trip_id =')) {
                        const tripId = params[0];
                        const result = this.tables.permits.filter(p => p.trip_id === tripId);
                        onSuccess({}, { rows: { _array: result } });
                    } else if (sql.startsWith('SELECT * FROM logbook WHERE trip_id =')) {
                        const tripId = params[0];
                        const result = this.tables.logbook.filter(l => l.trip_id === tripId);
                        onSuccess({}, { rows: { _array: result } });
                    } else if (sql.startsWith('INSERT INTO trips')) {
                        const newTrip = {
                            id: this.tables.trips.length + 1,
                            origin: params[0],
                            destination: params[1],
                            height: params[2],
                            width: params[3],
                            length: params[4],
                            weight: params[5],
                            routeStates: params[6],
                            created_at: params[7],
                        };
                        this.tables.trips.push(newTrip);
                        onSuccess && onSuccess();
                    } else if (sql.startsWith('INSERT INTO permits')) {
                        const newPermit = {
                            id: this.tables.permits.length + 1,
                            trip_id: params[0],
                            permit_name: params[1],
                            status: params[2],
                        };
                        this.tables.permits.push(newPermit);
                        onSuccess && onSuccess();
                    } else if (sql.startsWith('INSERT INTO logbook')) {
                        const newLog = {
                            id: this.tables.logbook.length + 1,
                            trip_id: params[0],
                            event_type: params[1],
                            timestamp: params[2],
                            notes: params[3],
                        };
                        this.tables.logbook.push(newLog);
                        onSuccess && onSuccess();
                    } else {
                        console.warn('InMemoryDB: Unsupported SQL:', sql);
                        onSuccess && onSuccess({}, { rows: { _array: [] } });
                    }
                },
            });
        }
    }

    db = new InMemoryDB();

} else {
    // Mobile — use expo-sqlite
    console.log('Running on Mobile — using expo-sqlite.');
    const SQLite = require('expo-sqlite');
    db = SQLite.openDatabase('tripplanner.db');
}

// Setup tables (on Mobile only — Web mock DB is auto-created)
export function setupDatabase() {
    if (Platform.OS === 'web') {
        console.log('InMemoryDB: setupDatabase — no action needed on Web.');
        return;
    }

    db.transaction(tx => {
        // Trips table
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS trips (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                origin TEXT,
                destination TEXT,
                height REAL,
                width REAL,
                length REAL,
                weight REAL,
                routeStates TEXT,
                created_at TEXT
            );`
        );

        // Permits table
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS permits (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                trip_id INTEGER,
                permit_name TEXT,
                status TEXT,
                FOREIGN KEY(trip_id) REFERENCES trips(id)
            );`
        );

        // Logbook table
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS logbook (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                trip_id INTEGER,
                event_type TEXT,
                timestamp TEXT,
                notes TEXT,
                FOREIGN KEY(trip_id) REFERENCES trips(id)
            );`
        );
    });
}

export function getDatabase() {
    return db;
}
