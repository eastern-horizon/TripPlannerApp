// src/database/database.js

let instance = null;

export function setupDatabase() {
    console.log('InMemoryDB: setupDatabase — no action needed on Web.');
}

export function getDatabase() {
    if (!instance) {
        console.log('Creating SINGLETON InMemoryDB instance');
        instance = new InMemoryDB();
    }
    return instance;
}

class InMemoryDB {
    constructor() {
        this.tables = {
            trips: [],
        };
        this.nextTripId = 1;
    }

    transaction(callback) {
        const tx = {
            executeSql: (sql, params = [], onSuccess, onError) => {
                console.log('InMemoryDB: executeSql called:', sql, params);

                if (sql.startsWith('SELECT * FROM trips WHERE id = ?')) {
                    const id = params[0];
                    const trip = this.tables.trips.find(t => t.id === id);
                    if (trip) {
                        console.log('InMemoryDB: SELECT id', id, '→ rows:', [trip]);
                        onSuccess?.(null, { rows: { length: 1, _array: [trip] } });
                    } else {
                        console.warn('InMemoryDB: Trip not found with id:', id);
                        onSuccess?.(null, { rows: { length: 0, _array: [] } });
                    }
                }

                else if (sql.startsWith('SELECT * FROM trips')) {
                    console.log('InMemoryDB: SELECT all trips → rows:', this.tables.trips);
                    onSuccess?.(null, { rows: { length: this.tables.trips.length, _array: this.tables.trips } });
                }

                else if (sql.startsWith('INSERT INTO trips')) {
                    const newTrip = {
                        id: this.nextTripId++,
                        origin: params[0],
                        destination: params[1],
                        height: params[2],
                        width: params[3],
                        length: params[4],
                        weight: params[5],
                        routeStates: JSON.stringify(params[6] || []),
                        routeCoordinates: JSON.stringify(params[7] || []),
                        created_at: params[8],
                    };
                    this.tables.trips.push(newTrip);
                    console.log('InMemoryDB: Inserted trip:', newTrip);
                    onSuccess?.(null, { insertId: newTrip.id });
                }

                else if (sql.startsWith('UPDATE trips SET routeCoordinates = ? WHERE id = ?')) {
                    const routeCoordinates = params[0];
                    const id = params[1];
                    const trip = this.tables.trips.find(t => t.id === id);
                    if (trip) {
                        trip.routeCoordinates = routeCoordinates;
                        console.log('InMemoryDB: Updated routeCoordinates for trip id', id);
                        onSuccess?.(null, { rowsAffected: 1 });
                    } else {
                        console.warn('InMemoryDB: Cannot update routeCoordinates — trip id not found:', id);
                        onSuccess?.(null, { rowsAffected: 0 });
                    }
                }

                else if (sql.startsWith('UPDATE trips SET origin = ?, destination = ? WHERE id = ?')) {
                    const origin = params[0];
                    const destination = params[1];
                    const id = params[2];

                    const trip = this.tables.trips.find(t => t.id === id);
                    if (trip) {
                        trip.origin = origin;
                        trip.destination = destination;
                        console.log('InMemoryDB: Updated trip id', id, 'with new origin/destination');
                        onSuccess?.(null, { rowsAffected: 1 });
                    } else {
                        console.warn('InMemoryDB: Cannot update origin/destination — trip id not found:', id);
                        onSuccess?.(null, { rowsAffected: 0 });
                    }
                }

                else {
                    console.warn('InMemoryDB: Unhandled SQL:', sql);
                    onError?.(new Error('Unhandled SQL'));
                }
            }
        };

        callback(tx);
    }
}
