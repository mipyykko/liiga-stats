export const convertHalfSecToMinute = (sec, half) => {
  const min = Math.floor(sec / 60) + 1
  const halfMin = half < 3 
    ? half * 45 
    : half < 5
      ? 90 + (half - 3) * 15
      : 120 
  const added = Math.max(0, min - halfMin)

  return { min: Math.min(min, halfMin), added }
}

export const convertHalfSecToMinuteString = (sec, half) => {
  const time = convertHalfSecToMinute(sec,half)

  return `${time.min}${time.added > 0 ? `+${time.added}` : ''}`
}