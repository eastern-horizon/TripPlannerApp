export function calculateFuelStops(routeMiles, mpg = 4.6, tankSize = 150) {
  const range = mpg * tankSize * 0.75; // stop with 1/4 tank left
  const stops = [];
  let miles = 0;

  while (miles < routeMiles) {
    miles += range;
    if (miles < routeMiles) {
      stops.push(miles);
    }
  }

  return stops;
}