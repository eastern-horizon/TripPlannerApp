// src/database/database.js

import { Platform } from 'react-native';

// Singleton instance
let dbInstance = null;

class InMemoryDB {
    constructor() {
        this.tables = {
            trips: [],
            permits: [],
            logbook: [],
        };
    }

    transaction(callback) {
        callback({
            executeSql: (sql, params = [], onSuccess) => {
                console.log('InMemoryDB: executeSql called:', sql, params);

                if (sql.startsWith('CREATE TABLE')) {
                    // No-op
                    console.log('InMemoryDB: CREATE TABLE — no action on Web.');
                    onSuccess?.(null, { rows: { length: 0, _array: [] } });
                }

                else if (sql.startsWith('INSERT INTO trips')) {
                    const trip = {
                        id: this.tables.trips.length + 1,
                        origin: params[0],
                        destination: params[1],
                        height: params[2],
                        width: params[3],
                        length: params[4],
                        weight: params[5],
                        routeStates: params[6],
                        routeCoordinates: params[7],  // ✅ Correct
                        created_at: params[8],
                    };
                    this.tables.trips.push(trip);
                    onSuccess?.(null, { insertId: trip.id, rowsAffected: 1 });
                }

                else if (sql.startsWith('UPDATE trips SET routeCoordinates')) {
                    const routeCoordinates = params[0];
                    const id = params[1];
                    const trip = this.tables.trips.find(t => t.id === id);
                    if (trip) {
                        trip.routeCoordinates = routeCoordinates;
                        console.log('InMemoryDB: Updated trip id', id, 'with new routeCoordinates');
                        onSuccess?.(null, { rowsAffected: 1 });
                    } else {
                        console.warn('InMemoryDB: Cannot update — trip id not found:', id);
                        onSuccess?.(null, { rowsAffected: 0 });
                    }
                }

                else if (sql.startsWith('SELECT * FROM trips WHERE id = ?')) {
                    const id = params[0];
                    const row = this.tables.trips.find(t => t.id === id);
                    const rows = row ? [row] : [];
                    console.log('InMemoryDB: SELECT id', id, '→ rows:', rows);
                    onSuccess?.(null, { rows: { length: rows.length, _array: rows } });
                }

                else if (sql.startsWith('SELECT * FROM trips')) {
                    const rows = this.tables.trips;
                    onSuccess?.(null, { rows: { length: rows.length, _array: rows } });
                }

                else {
                    console.warn('InMemoryDB: Unhandled SQL:', sql);
                    onSuccess?.(null, { rows: { length: 0, _array: [] } });
                }
            },
        });
    }
}

export function setupDatabase() {
    if (Platform.OS === 'web') {
        console.log('InMemoryDB: setupDatabase — no action needed on Web.');
    } else {
        const db = getDatabase();
        db.transaction(tx => {
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
                    routeCoordinates TEXT,
                    created_at TEXT
                );`
            );
        });
    }
}

export function getDatabase() {
    if (Platform.OS === 'web') {
        if (!dbInstance) {
            console.log('Creating SINGLETON InMemoryDB instance');
            dbInstance = new InMemoryDB();
        }
        return dbInstance;
    } else {
        if (!dbInstance) {
            console.log('Creating SQLite DB instance');
            const SQLite = require('expo-sqlite');
            dbInstance = SQLite.openDatabase('tripplanner.db');
        }
        return dbInstance;
    }
}
