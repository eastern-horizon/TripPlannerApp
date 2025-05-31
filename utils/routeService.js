// utils/routeService.js

import Constants from 'expo-constants'

// pull your key from app.json → expo.extra
const cfg = Constants.manifest ?? Constants.expoConfig
const ORS_KEY = cfg?.extra?.ORS_API_KEY
if (!ORS_KEY) {
  console.error('❌ Missing ORS_API_KEY in app.json under expo.extra')
  throw new Error('No ORS_API_KEY—add it to expo.extra in app.json')
}

// GEOJSON endpoint for driving-car (no truck limits, no profile caps)
const BASE_URL = 'https://api.openrouteservice.org/v2/directions/driving-car/geojson'

/**
 * Fetch a route from A → B
 * @param {{ lat: number, lng: number }} origin
 * @param {{ lat: number, lng: number }} destination
 * @returns {Promise<{ distance: number, duration: number, steps: any[] }>}
 */
export async function fetchRoute(origin, destination) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      Authorization: ORS_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      coordinates: [
        [origin.lng, origin.lat],
        [destination.lng, destination.lat],
      ],
    }),
  })

  const data = await res.json()

  if (!res.ok) {
    console.error('🛑 ORS routing error', res.status, data)
    throw new Error(`ORS routing error: ${res.status}`)
  }

  const feat = data.features?.[0]
  if (!feat) {
    console.error('❌ ORS returned no features', data)
    throw new Error('No route found between those two points.')
  }

  const { distance, duration } = feat.properties.summary
  const steps = feat.properties.segments[0].steps

  return { distance, duration, steps }
}