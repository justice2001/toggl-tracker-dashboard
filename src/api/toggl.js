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
            console.log(JSON.parse(cache));
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