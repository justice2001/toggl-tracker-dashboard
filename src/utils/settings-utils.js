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

/**
 * Save Settings
 * @param {object} settings Setting Obejct
 * @param {boolean} dismissWarning Dismiss warning, like setting valid warning
 */
export function saveSettings(settings, dismissWarning=false) {
    if (!checkSettings) {
        console.warn("Settings not valid");
        if (!dismissWarning) return
    }
    localStorage.setItem(SETTING_KEY, JSON.stringify(settings))
}

/**
 * Check setting validation
 * @param {object} settings Check setting
 * @returns valid
 */
export function checkSettings(settings) {
    Object.keys(SETTING_DICT).forEach(k => {
        if (!settings[k]) {
            return false
        }
    })
    return true
}

/**
 * Get setting value with setting key
 * @param {string} key Setting Key
 * @param {object|null} settings Provided Settings Dict
 * @returns Setting Value
 */
export function getSetting(key, settings=null) {
    if (!settings) settings = getSettings()
    const value = settings[key]
    if (!value) return SETTING_DICT[key].default
    return value
}

/**
 * Get all settings object
 * @returns All Settings Object
 */
export function getSettings() {
    const settingsRaw = localStorage.getItem(SETTING_KEY)
    if(!settingsRaw) return {}
    return JSON.parse(settingsRaw)
}