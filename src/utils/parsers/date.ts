const SECONDS = 1 * 1000
const MINUTES = SECONDS * 60
const HOURS = MINUTES * 60

export function formatTimestampWithUnit(timestamp: number) {
  if (timestamp < SECONDS) {
    return {
      size: timestamp,
      unit: 'ms',
    }
  } else if (timestamp < MINUTES) {
    return {
      size: Number.parseFloat((timestamp / SECONDS % 60).toFixed(2)),
      unit: 's',
    }
  } else if (timestamp < HOURS) {
    return {
      size: Number.parseFloat((timestamp / MINUTES % 60).toFixed(2)),
      unit: 'min',
    }
  } else {
    return {
      size: Number.parseFloat((timestamp / HOURS).toFixed(2)),
      unit: 'h',
    }
  }
}
