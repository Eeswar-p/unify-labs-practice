export function applyTheme(theme) {
    const nextTheme = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', nextTheme);
}

export function applyCompactMode(enabled) {
    document.body.classList.toggle('compact', Boolean(enabled));
}

export function setTipsVisibility(show) {
    const tipsPanel = document.getElementById('tipsPanel');
    tipsPanel.classList.toggle('hidden', !show);
}
