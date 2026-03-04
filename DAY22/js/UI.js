export function getUIRefs() {
    return {
        searchInput: document.getElementById('searchInput'),
        sortSelect: document.getElementById('sortSelect'),
        favoritesOnly: document.getElementById('favoritesOnly'),
        themeToggle: document.getElementById('themeToggle'),
        themeLabel: document.getElementById('themeLabel'),
        refreshBtn: document.getElementById('refreshBtn'),
        notification: document.getElementById('notification'),
        loader: document.getElementById('loader'),
        emptyState: document.getElementById('emptyState'),
        coinsGrid: document.getElementById('coinsGrid'),
        visibleCount: document.getElementById('visibleCount'),
        favoriteCount: document.getElementById('favoriteCount'),
        totalMarketCap: document.getElementById('totalMarketCap'),
        avgChange: document.getElementById('avgChange')
    };
}

export function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: value < 1 ? 6 : 2
    }).format(value || 0);
}

export function formatCompactCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        maximumFractionDigits: 2
    }).format(value || 0);
}

export function formatPercent(value) {
    if (value === null || value === undefined || Number.isNaN(value)) {
        return '0.00%';
    }

    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}

export function renderCoinCards(coinsGrid, coins, favoritesSet) {
    const html = coins
        .map((coin) => {
            const isFavorite = favoritesSet.has(coin.id);
            const change = coin.price_change_percentage_24h ?? 0;
            const changeClass = change >= 0 ? 'positive' : 'negative';

            return `
                <article class="coin-card" data-coin-id="${coin.id}">
                    <div class="coin-top">
                        <div class="coin-identity">
                            <img src="${coin.image}" alt="${coin.name} logo" loading="lazy" />
                            <div>
                                <h3 class="coin-name">${coin.name}</h3>
                                <p class="coin-symbol">${coin.symbol}</p>
                            </div>
                        </div>
                        <span class="rank-pill">#${coin.market_cap_rank || '-'}</span>
                    </div>

                    <div class="coin-metrics">
                        <div class="metric">
                            <span>Price</span>
                            <strong>${formatCurrency(coin.current_price)}</strong>
                        </div>
                        <div class="metric">
                            <span>24h Change</span>
                            <strong class="${changeClass}">${formatPercent(change)}</strong>
                        </div>
                        <div class="metric">
                            <span>Market Cap</span>
                            <strong>${formatCompactCurrency(coin.market_cap)}</strong>
                        </div>
                    </div>

                    <button
                        class="favorite-btn ${isFavorite ? 'active' : ''}"
                        data-action="toggle-favorite"
                        data-coin-id="${coin.id}"
                        type="button"
                    >
                        ${isFavorite ? '★ In Watchlist' : '☆ Add to Watchlist'}
                    </button>
                </article>
            `;
        })
        .join('');

    coinsGrid.innerHTML = html;
}

export function renderSummary(refs, summary) {
    refs.visibleCount.textContent = String(summary.visibleCount);
    refs.favoriteCount.textContent = String(summary.favoriteCount);
    refs.totalMarketCap.textContent = formatCompactCurrency(summary.totalMarketCap);
    refs.avgChange.textContent = formatPercent(summary.avgChange);
}

export function showNotification(notificationEl, message, type = 'error') {
    notificationEl.textContent = message;
    notificationEl.className = `notification ${type}`;
}

export function clearNotification(notificationEl) {
    notificationEl.className = 'notification hidden';
    notificationEl.textContent = '';
}

export function toggleLoader(loaderEl, shouldShow) {
    loaderEl.classList.toggle('hidden', !shouldShow);
}

export function toggleEmptyState(emptyStateEl, shouldShow) {
    emptyStateEl.classList.toggle('hidden', !shouldShow);
}

export function applyTheme(theme) {
    const safeTheme = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', safeTheme);
}

export function updateThemeLabel(themeLabelEl, theme) {
    themeLabelEl.textContent = theme === 'dark' ? 'Dark' : 'Light';
}

const UI = {
    getUIRefs,
    renderCoinCards,
    renderSummary,
    showNotification,
    clearNotification,
    toggleLoader,
    toggleEmptyState,
    applyTheme,
    updateThemeLabel
};

export default UI;
