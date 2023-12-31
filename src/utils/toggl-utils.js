import { getDate } from "./baseUtils";

export const getToday = toggl => {
    const todayDate = new Date(getDate(new Date()))
    return betweenDate(toggl, todayDate)
}

export const getWeek = toggl => {
    const weekData = []
    const weekMap = {}
    let weekRaw = getWeekRaw(toggl)
    const sd = new Date(new Date().setDate(new Date().getDate()-7))
    for (let i = 0; i< 7;i++) {
        weekMap[getDate(new Date(sd.setDate(sd.getDate()+1)))] = i
        weekData[i] = 0
    }
    weekRaw.forEach(entire => {
        if (entire.duration > 0)
            weekData[weekMap[getDate(new Date(entire.start))]] += entire.duration
    })
    return weekData
}

export const getRecentDayCount = (toggl, day=7) => {
    const weekData = []
    const weekMap = {}
    const sd = new Date(new Date().setDate(new Date().getDate()-day))
    // const sd = new Date(new Date().setDate(new Date().getDate()-day - 1))
    const ed = new Date(new Date().setDate(new Date().getDate()+1))
    let weekRaw = betweenDate(toggl, sd, ed)
    for (let i = 0; i< day;i++) {
        weekMap[getDate(new Date(sd.setDate(sd.getDate()+1)))] = i
        weekData[i] = 0
    }
    weekRaw.forEach(entire => {
        if (entire.duration > 0)
            weekData[weekMap[getDate(new Date(entire.start))]] += entire.duration
    })
    return weekData
}

export const getWeekRaw = toogl => {
  const sd = new Date(new Date().setDate(new Date().getDate()-6))
  const ed = new Date(new Date().setDate(new Date().getDate()+1))
  return betweenDate(toogl, sd, ed)
}

/**
 * 获取时间段内的所有Entire
 * @param {Array} entires
 * @param {Date} start
 * @param {Date} end
 */
const betweenDate = (entires, start, end = new Date(new Date(start).setDate(start.getDate()+1))) => {
    const td = []
    entires.forEach(entire => {
        const dt = new Date(entire.start)
        if (dt >= start && dt < end) {
            td.push(entire)
        }
    })
    return td
}

/**
 * Statistic time total duration
 * @param {Array} toggl data
 * @return Total time
 */
export const statisticsTime = toggl => {
    let totalTime = 0.0
    toggl.forEach(entire => {
        if (entire.duration > 0) {
            totalTime += entire.duration
        }
    })
    return totalTime
}

/**
 * Get all entire that can start
 * @param data
 */
export const getAllEntire = data => {
    const entireSign = []
    const entire = []
    data.forEach(dt => {
        if (!entireSign.includes(dt.description)) {
            entireSign.push(dt.description)
            entire.push(dt)
        }
    })
    return entire
}
