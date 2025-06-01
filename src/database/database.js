// src/database/database.js

console.log('Creating SINGLETON InMemoryDB instance');

class InMemoryDB {
    constructor() {
        this.trips = [];
        this.logbook = [];
        this.nextTripId = 1;
        this.nextLogEntryId = 1;
    }

    setupDatabase() {
        console.log('InMemoryDB: setupDatabase — no action needed on Web.');
    }

    // --- TRIPS ---

    getAllTrips() {
        console.log('InMemoryDB: SELECT all trips → rows:', this.trips);
        return Promise.resolve([...this.trips]);
    }

    getTripById(tripId) {
        const trip = this.trips.find(t => t.id === tripId);
        console.log(`InMemoryDB: SELECT trip id ${tripId} →`, trip ? trip : null);
        return Promise.resolve(trip ? { ...trip } : null);
    }

    insertTrip(trip) {
        const newTrip = { ...trip, id: this.nextTripId++ };
        this.trips.push(newTrip);
        console.log('InMemoryDB: Inserted trip:', newTrip);
        return Promise.resolve(newTrip.id);
    }

    updateTripOriginDestination(tripId, origin, destination) {
        const trip = this.trips.find(t => t.id === tripId);
        if (trip) {
            trip.origin = origin;
            trip.destination = destination;
            console.log(`InMemoryDB: Updated trip id ${tripId} origin/destination`);
        } else {
            console.warn(`InMemoryDB: Trip id ${tripId} not found for update`);
        }
        return Promise.resolve();
    }

    updateTripRouteCoordinates(tripId, coords) {
        const trip = this.trips.find(t => t.id === tripId);
        if (trip) {
            trip.routeCoordinates = JSON.stringify(coords);
            console.log(`InMemoryDB: Updated trip id ${tripId} routeCoordinates`);
        } else {
            console.warn(`InMemoryDB: Trip id ${tripId} not found for route update`);
        }
        return Promise.resolve();
    }

    // --- LOGBOOK ---

    getLogEntries(tripId) {
        const entries = this.logbook
            .filter(entry => entry.tripId === tripId)
            .map(entry => ({ ...entry }));

        console.log(`InMemoryDB: SELECT log entries for trip ${tripId} →`, entries);
        return Promise.resolve(entries);
    }

    insertLogEntry(entry) {
        const newEntry = {
            id: this.nextLogEntryId++,
            tripId: entry.tripId,
            eventType: entry.eventType,
            timestamp: entry.timestamp,
            notes: entry.notes
        };
        this.logbook.push(newEntry);
        console.log('InMemoryDB: Inserted log entry:', newEntry);
        return Promise.resolve(newEntry.id);
    }
}

// --- EXPORTS ---

export const database = new InMemoryDB();

export const setupDatabase = () => database.setupDatabase();

// TRIPS
export const getAllTrips = () => database.getAllTrips();
export const getTripById = (tripId) => database.getTripById(tripId);
export const insertTrip = (trip) => database.insertTrip(trip);
export const updateTripOriginDestination = (tripId, origin, destination) =>
    database.updateTripOriginDestination(tripId, origin, destination);
export const updateTripRouteCoordinates = (tripId, coords) =>
    database.updateTripRouteCoordinates(tripId, coords);

// LOGBOOK
export const getLogEntries = (tripId) => database.getLogEntries(tripId);
export const insertLogEntry = (entry) => database.insertLogEntry(entry);
