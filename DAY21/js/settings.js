const STORAGE_KEY = 'day21.settings';

export const DEFAULT_SETTINGS = Object.freeze({
    theme: 'light',
    compactMode: false,
    showTips: true
});

function normalizeSettings(rawSettings = {}) {
    if (!rawSettings || typeof rawSettings !== 'object') {
        return { ...DEFAULT_SETTINGS };
    }

    return {
        theme: rawSettings.theme === 'dark' ? 'dark' : 'light',
        compactMode: Boolean(rawSettings.compactMode),
        showTips: rawSettings.showTips !== false
    };
}

export function loadSettings() {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
        return { ...DEFAULT_SETTINGS };
    }

    try {
        const parsed = JSON.parse(stored);
        return normalizeSettings(parsed);
    } catch {
        localStorage.removeItem(STORAGE_KEY);
        return { ...DEFAULT_SETTINGS };
    }
}

export function saveSettings(settings) {
    const normalized = normalizeSettings(settings);
    const serialized = JSON.stringify(normalized);
    localStorage.setItem(STORAGE_KEY, serialized);
    return normalized;
}

export function updateSetting(key, value) {
    const current = loadSettings();
    const next = {
        ...current,
        [key]: value
    };

    return saveSettings(next);
}

export function resetSettings() {
    localStorage.removeItem(STORAGE_KEY);
    return { ...DEFAULT_SETTINGS };
}
