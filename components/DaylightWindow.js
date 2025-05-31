export function getDaylightWindow(date, lat, lon) {
  const sunrise = new Date(date);
  const sunset = new Date(date);

  sunrise.setHours(6, 0); // placeholder values
  sunset.setHours(19, 30);

  return { sunrise, sunset };
}