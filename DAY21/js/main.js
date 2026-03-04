import {
    DEFAULT_SETTINGS,
    loadSettings,
    saveSettings,
    updateSetting,
    resetSettings
} from './settings.js';
import {
    applyTheme,
    applyCompactMode,
    setTipsVisibility
} from './theme.js';

const themeToggle = document.getElementById('themeToggle');
const compactToggle = document.getElementById('compactToggle');
const tipsToggle = document.getElementById('tipsToggle');
const themeValue = document.getElementById('themeValue');
const saveBtn = document.getElementById('saveBtn');
const resetBtn = document.getElementById('resetBtn');
const saveStatus = document.getElementById('saveStatus');
const settingsPreview = document.getElementById('settingsPreview');

let currentSettings = loadSettings();

function getSettingsFromUI() {
    return {
        theme: themeToggle.checked ? 'dark' : 'light',
        compactMode: compactToggle.checked,
        showTips: tipsToggle.checked
    };
}

function syncUI(settings) {
    themeToggle.checked = settings.theme === 'dark';
    compactToggle.checked = settings.compactMode;
    tipsToggle.checked = settings.showTips;
}

function applySettings(settings) {
    applyTheme(settings.theme);
    applyCompactMode(settings.compactMode);
    setTipsVisibility(settings.showTips);
    themeValue.textContent = settings.theme === 'dark' ? 'Dark' : 'Light';
    settingsPreview.textContent = JSON.stringify(settings, null, 2);
}

function setStatus(message, type = 'info') {
    saveStatus.textContent = message;
    saveStatus.className = `save-status ${type}`;
}

function persistAndApply(nextSettings) {
    currentSettings = saveSettings(nextSettings);
    applySettings(currentSettings);
    setStatus(`Saved at ${new Date().toLocaleTimeString()}`, 'success');
}

function initialize() {
    currentSettings = {
        ...DEFAULT_SETTINGS,
        ...currentSettings
    };

    syncUI(currentSettings);
    applySettings(currentSettings);
    setStatus('Loaded saved settings from localStorage.', 'info');
}

themeToggle.addEventListener('change', () => {
    const theme = themeToggle.checked ? 'dark' : 'light';
    currentSettings = updateSetting('theme', theme);
    applySettings(currentSettings);
    setStatus('Theme updated and saved.', 'success');
});

compactToggle.addEventListener('change', () => {
    const compactMode = compactToggle.checked;
    currentSettings = updateSetting('compactMode', compactMode);
    applySettings(currentSettings);
    setStatus('Compact layout updated and saved.', 'success');
});

tipsToggle.addEventListener('change', () => {
    const showTips = tipsToggle.checked;
    currentSettings = updateSetting('showTips', showTips);
    applySettings(currentSettings);
    setStatus('Tips visibility updated and saved.', 'success');
});

saveBtn.addEventListener('click', () => {
    const next = getSettingsFromUI();
    persistAndApply(next);
});

resetBtn.addEventListener('click', () => {
    currentSettings = resetSettings();
    syncUI(currentSettings);
    applySettings(currentSettings);
    setStatus('Settings reset to defaults.', 'info');
});

window.addEventListener('storage', (event) => {
    if (event.key !== 'day21.settings') {
        return;
    }

    currentSettings = loadSettings();
    syncUI(currentSettings);
    applySettings(currentSettings);
    setStatus('Settings reloaded from another tab.', 'info');
});

initialize();
