export function calculateHOS(dutyLogs) {
  let remaining = 70 * 60; // 70 hours in minutes
  const results = [];

  for (let log of dutyLogs) {
    const used = log.onDuty + log.driving;
    remaining -= used;
    results.push({
      date: log.date,
      driving: log.driving,
      onDuty: log.onDuty,
      remaining
    });
  }

  return results;
}