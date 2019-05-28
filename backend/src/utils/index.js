export const shallowCompare = (obj1, obj2) =>
  Object.keys(obj1).length === Object.keys(obj2).length &&
  Object.keys(obj1).every(key => obj1[key] === obj2[key])

const isNumber = n => typeof n === 'number'

export const convertTimeToSec = (min, sec) => isNumber(min) && isNumber(sec) ? min * 60 + sec : null