import cfg from "../../cfg";
import Axios from "axios";

const UPDATE_TIME_KEY = "last_update"
const CACHE_KEY = "toggl_cache"
const EXPIRE_TIME = 1000 * 60 * 60

const email = cfg.email
const password = cfg.password

export const getEntires = (start, end, force=false) => {
    const lastUpdate = localStorage.getItem(UPDATE_TIME_KEY)
    const cache = localStorage.getItem(CACHE_KEY)
    if (!force && cache && new Date() - new Date(lastUpdate) < EXPIRE_TIME) {
        console.log("LOAD IN CACHE");
        return new Promise((resolve, reject) => {
            resolve(JSON.parse(cache))
        })
    }

    return new Promise((resolve, reject) => {
        Axios.get(`/api/v9/me/time_entries?start_date=${start}&end_date=${end}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${window.btoa(email + ":" + password)}`
            }
        }).then(res => {
            // Save Cache
            localStorage.setItem(CACHE_KEY, JSON.stringify(res.data))
            localStorage.setItem(UPDATE_TIME_KEY, new Date())
            resolve(res.data)
        }).catch(e => {
            reject(e)
        })
    })
}

export const getCurrentTimeEntire = () => {
    return new Promise((resolve, reject) => {
        Axios.get(`/api/v9/me/time_entries/current`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${window.btoa(email + ":" + password)}`
            }
        }).then(res => {
            resolve(res.data)
        }).catch(e => {
            reject(e)
        })
    })
}
//https://api.track.toggl.com/api/v9/workspaces/{workspace_id}/time_entries/{time_entry_id}/stop

export const stopTimeEntire = (wid, entireId) => {
    return new Promise((resolve, reject) => {
        Axios.patch(`/api/v9/workspaces/${wid}/time_entries/${entireId}/stop`, {}, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${window.btoa(email + ":" + password)}`
            }
        }).then(res => {
            resolve(res.data)
        }).catch(e => {
            reject(e)
        })
    })
}

export const startEntire = (entire) => {
    return new Promise((resolve, reject) => {
        Axios.post(`/api/v9/workspaces/${entire.workspace_id}/time_entries`, entire, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${window.btoa(email + ":" + password)}`
            }
        }).then(res => {
            resolve(res.data)
        }).catch(e => {
            reject(e)
        })
    })
}

export const deleteEntire = (wid, eid) => {
    return new Promise((resolve, reject) => {
        Axios.delete(`/api/v9/workspaces/${wid}/time_entries/${eid}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${window.btoa(email + ":" + password)}`
            }
        }).then(res => {
            resolve(res.data)
        }).catch(e => {
            reject(e)
        })
    })
}
