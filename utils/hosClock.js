// utils/hosClock.js

// Simple HOS logic → 11 driving hours max per day (example)
const MAX_DRIVING_HOURS = 11;

export function calculateRemainingHOS(driveStartTimestamp, drivingMinutes) {
    const remainingHours = MAX_DRIVING_HOURS - (drivingMinutes / 60);
    return Math.max(remainingHours, 0);
}

export function getMaxDrivingHours() {
    return MAX_DRIVING_HOURS;
}
