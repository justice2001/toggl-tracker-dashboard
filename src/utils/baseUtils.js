/**
 * getDate
 * @param {Date} date Date
 */
export const getDate = (date) => {
    const y = date.getFullYear()
    const m = (date.getMonth() + 1).toString().padStart(2, "0")
    const d = date.getDate().toString().padStart(2, "0")
    return `${y}-${m}-${d}`
  }
  
export const getTimeFormat = (duration) => {
  let hour = Math.floor(duration / 3600) >= 10 ? Math.floor(duration / 3600) : '0' + Math.floor(duration / 3600);
  duration -= 3600 * hour;
  let min = Math.floor(duration / 60) >= 10 ? Math.floor(duration / 60) : '0' + Math.floor(duration / 60);
  duration -= 60 * min;
  let sec = duration >= 10 ? duration : '0' + duration;
  return hour + ':' + min + ':' + sec;
}

/**
 * Get Formatted Time from date
 * @param {Date} date Date
 * @param {boolean} useSec Generate Second
 * @returns Time
 */
export const getTime = (date, useSec=false) => {
  let time = `${fillZero(date.getHours())}:${fillZero(date.getMinutes())}`
  if (useSec) {
    time += `:` + fillZero(date.getSeconds())
  }
  return time
}

/**
 * Fill Zero in specified number of digits 
 * @param {string|number} src Source String
 * @param {number} number Number
 * @returns Processed
 */
export const fillZero = (src, number=2) => {
  return src.toString().padStart(number, "0")
}
