// src/utils/ors.js

// Fetch route from ORS Routing API
export async function fetchRouteFromORS(origin, destination, apiKey) {
    const url = 'https://api.openrouteservice.org/v2/directions/driving-car/geojson';

    const body = {
        coordinates: [
            [origin.lng, origin.lat],
            [destination.lng, destination.lat]
        ]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(`ORS API error: ${response.status}`);
        }

        const data = await response.json();

        // Extract coordinates from GeoJSON
        const coords = data.features[0].geometry.coordinates.map(coord => ({
            lat: coord[1],
            lng: coord[0]
        }));

        console.log('ORS route fetched:', coords);

        return coords;

    } catch (error) {
        console.error('Failed to fetch ORS route:', error);
        return [];
    }
}

// Geocode an address → ORS Geocoding API
export async function geocodeAddress(address, apiKey) {
    const url = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(address)}&size=1`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`ORS Geocode API error: ${response.status}`);
        }

        const data = await response.json();

        if (data.features.length === 0) {
            console.warn('Geocode returned no results for:', address);
            return null;
        }

        const coords = data.features[0].geometry.coordinates;
        const latlng = { lat: coords[1], lng: coords[0] };

        console.log(`Geocoded "${address}" →`, latlng);

        return latlng;

    } catch (error) {
        console.error('Failed to geocode address:', address, error);
        return null;
    }
}
