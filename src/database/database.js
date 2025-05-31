// src/database/database.js

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('tripplanner.db');

export function setupDatabase() {
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
