export const convertHalfSecToMinute = (sec, half) => {
  const min = Math.floor(sec / 60) + 1
  const added = Math.max(0, min - (half * 45))

  console.log(min, added)

  return { min: Math.min(min, half * 45), added }
}

export const convertHalfSecToMinuteString = (sec, half) => {
  const time = convertHalfSecToMinute(sec,half)

  return `${time.min}${time.added > 0 ? `+${time.added}` : ''}`
}