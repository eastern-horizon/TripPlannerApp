// utils/permitEngine.js

// Simple example rules (later can move to DB or config file)
const STATE_RULES = {
    "CA": { maxHeight: 14, maxWidth: 8.5, escortRequiredOverHeight: 14 },
    "TX": { maxHeight: 14, maxWidth: 8.5, escortRequiredOverHeight: 14.5 },
    // Add more states...
};

export function getRequiredPermits(trip) {
    const permits = [];
    const routeStates = trip.routeStates || []; // Example: ["CA", "TX"]

    routeStates.forEach(state => {
        const rules = STATE_RULES[state];
        if (!rules) {
            permits.push(`Unknown state rules for ${state}`);
            return;
        }

        if (trip.height > rules.maxHeight) {
            permits.push(`${state} - Oversize Permit Required`);
            if (trip.height > rules.escortRequiredOverHeight) {
                permits.push(`${state} - Escort Required`);
            }
        }
        if (trip.width > rules.maxWidth) {
            permits.push(`${state} - Overwidth Permit Required`);
        }
    });

    return permits;
}
