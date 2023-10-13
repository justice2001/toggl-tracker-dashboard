const SETTING_DICT = {
    "recentDaysCount": {
        description: "Show Recent Days",
        type: "number",
        default: 7
    },
    "targetDate": {
        description: "Show Recent Days",
        type: "string",
        default: "2023-12-23"
    }
}
const SETTING_KEY = "settings"

/**
 * Initial Setting
 * @param {boolean} overlay Overlay Configuration
 */
export function initSettings(overlay = false) {
    // Get Settings
    const settings = getSettings()
    let changed = false
    // Check
    Object.keys(SETTING_DICT).forEach(k => {
        if (!settings[k]) {
            // Init this
            settings[k] = SETTING_DICT[k].default
            changed = true
        }
    })
    // Save
    if (changed) saveSettings(settings)
}

export function saveSettings(settings, dismissWarning=false) {
    if (!checkSettings) {
        console.warn("Settings not valid");
        if (!dismissWarning) return
    }
    localStorage.setItem(SETTING_KEY, settings)
}

export function checkSettings(settings) {
    Object.keys(SETTING_DICT).forEach(k => {
        if (!settings[k]) {
            return false
        }
    })
    return true
}

export function getSetting(key, settings=null) {
    if (!settings) settings = getSettings()
    return settings[key]
}

export function getSettings() {
    const settingsRaw = localStorage.getItem(SETTING_KEY)
    if(!settingsRaw) return {}
    return JSON.parse(settingsRaw)
}