// utils/routeGenerator.js

// Dummy route generator → later can hook to backend or API
export function generateRoute(origin, destination) {
    // Return simple dummy route (array of waypoints)
    return {
        origin,
        destination,
        waypoints: [
            { lat: 34.05, lon: -118.25 }, // Example point: Los Angeles
            { lat: 36.17, lon: -115.14 }, // Example point: Las Vegas
            { lat: 39.74, lon: -104.99 }, // Example point: Denver
        ],
    };
}
