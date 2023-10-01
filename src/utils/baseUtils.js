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