import API, { fetchCoinMarkets } from './API.js';
import UI, {
    getUIRefs,
    renderCoinCards,
    renderSummary,
    showNotification,
    clearNotification,
    applyTheme,
    updateThemeLabel
} from './UI.js';

const STORAGE_KEYS = {
    preferences: 'day22.preferences',
    favorites: 'day22.favorites'
};

const DEFAULT_PREFERENCES = {
    query: '',
    sortBy: 'market_cap_desc',
    favoritesOnly: false,
    theme: 'light'
};

const State = {
    coins: [],
    visibleCoins: [],
    favorites: new Set(),
    preferences: { ...DEFAULT_PREFERENCES },
    status: {
        loading: false,
        error: null
    }
};

const refs = getUIRefs();
let renderQueued = false;

function readJSON(key, fallback) {
    const raw = localStorage.getItem(key);
    if (!raw) {
        return fallback;
    }

    try {
        return JSON.parse(raw);
    } catch {
        return fallback;
    }
}

function writeJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function hydrateStateFromStorage() {
    const savedPreferences = readJSON(STORAGE_KEYS.preferences, DEFAULT_PREFERENCES);
    const savedFavorites = readJSON(STORAGE_KEYS.favorites, []);

    State.preferences = {
        ...DEFAULT_PREFERENCES,
        ...savedPreferences,
        theme: savedPreferences.theme === 'dark' ? 'dark' : 'light'
    };

    State.favorites = new Set(Array.isArray(savedFavorites) ? savedFavorites : []);
}

function persistPreferences() {
    writeJSON(STORAGE_KEYS.preferences, State.preferences);
}

function persistFavorites() {
    writeJSON(STORAGE_KEYS.favorites, [...State.favorites]);
}

function syncControlsFromState() {
    refs.searchInput.value = State.preferences.query;
    refs.sortSelect.value = State.preferences.sortBy;
    refs.favoritesOnly.checked = State.preferences.favoritesOnly;
    refs.themeToggle.checked = State.preferences.theme === 'dark';
}

function getSortComparator(sortBy) {
    const comparators = {
        market_cap_desc: (a, b) => (b.market_cap ?? 0) - (a.market_cap ?? 0),
        market_cap_asc: (a, b) => (a.market_cap ?? 0) - (b.market_cap ?? 0),
        price_desc: (a, b) => (b.current_price ?? 0) - (a.current_price ?? 0),
        price_asc: (a, b) => (a.current_price ?? 0) - (b.current_price ?? 0),
        change_desc: (a, b) => (b.price_change_percentage_24h ?? 0) - (a.price_change_percentage_24h ?? 0),
        change_asc: (a, b) => (a.price_change_percentage_24h ?? 0) - (b.price_change_percentage_24h ?? 0),
        name_asc: (a, b) => a.name.localeCompare(b.name),
        name_desc: (a, b) => b.name.localeCompare(a.name)
    };

    return comparators[sortBy] || comparators.market_cap_desc;
}

function deriveVisibleCoins() {
    const query = State.preferences.query.trim().toLowerCase();

    const searched = State.coins.filter((coin) => {
        if (!query) {
            return true;
        }

        const name = coin.name?.toLowerCase() ?? '';
        const symbol = coin.symbol?.toLowerCase() ?? '';
        return name.includes(query) || symbol.includes(query);
    });

    const watchlistFiltered = State.preferences.favoritesOnly
        ? searched.filter((coin) => State.favorites.has(coin.id))
        : searched;

    State.visibleCoins = [...watchlistFiltered].sort(getSortComparator(State.preferences.sortBy));
}

function buildSummary() {
    const aggregate = State.visibleCoins.reduce(
        (acc, coin) => {
            const marketCap = coin.market_cap ?? 0;
            const change = coin.price_change_percentage_24h ?? 0;

            acc.visibleCount += 1;
            acc.totalMarketCap += marketCap;
            acc.changeTotal += change;
            return acc;
        },
        {
            visibleCount: 0,
            totalMarketCap: 0,
            changeTotal: 0
        }
    );

    return {
        visibleCount: aggregate.visibleCount,
        favoriteCount: State.favorites.size,
        totalMarketCap: aggregate.totalMarketCap,
        avgChange: aggregate.visibleCount > 0 ? aggregate.changeTotal / aggregate.visibleCount : 0
    };
}

function applyThemePreference() {
    applyTheme(State.preferences.theme);
    updateThemeLabel(refs.themeLabel, State.preferences.theme);
}

function render() {
    deriveVisibleCoins();

    renderCoinCards(refs.coinsGrid, State.visibleCoins, State.favorites);
    renderSummary(refs, buildSummary());

    UI.toggleEmptyState(refs.emptyState, State.visibleCoins.length === 0 && !State.status.loading);
}

function scheduleRender() {
    if (renderQueued) {
        return;
    }

    renderQueued = true;
    requestAnimationFrame(() => {
        renderQueued = false;
        render();
    });
}

function toggleFavorite(coinId) {
    if (!coinId) {
        return;
    }

    if (State.favorites.has(coinId)) {
        State.favorites.delete(coinId);
    } else {
        State.favorites.add(coinId);
    }

    persistFavorites();
    scheduleRender();
}

async function loadCoins(useNamedExport = false) {
    State.status.loading = true;
    State.status.error = null;

    UI.toggleLoader(refs.loader, true);
    clearNotification(refs.notification);

    try {
        const request = useNamedExport ? fetchCoinMarkets : API.fetchCoinMarkets;
        const data = await request({ per_page: 50, page: 1 });

        State.coins = data;

        showNotification(refs.notification, `Loaded ${data.length} assets successfully.`, 'info');
    } catch (error) {
        State.status.error = error;
        State.coins = [];

        showNotification(
            refs.notification,
            `Failed to fetch market data: ${error.message || 'Unknown error'}`,
            'error'
        );
    } finally {
        State.status.loading = false;
        UI.toggleLoader(refs.loader, false);
        scheduleRender();
    }
}

function bindEvents() {
    refs.searchInput.addEventListener('input', (event) => {
        State.preferences.query = event.target.value;
        persistPreferences();
        scheduleRender();
    });

    refs.sortSelect.addEventListener('change', (event) => {
        State.preferences.sortBy = event.target.value;
        persistPreferences();
        scheduleRender();
    });

    refs.favoritesOnly.addEventListener('change', (event) => {
        State.preferences.favoritesOnly = event.target.checked;
        persistPreferences();
        scheduleRender();
    });

    refs.themeToggle.addEventListener('change', (event) => {
        State.preferences.theme = event.target.checked ? 'dark' : 'light';
        persistPreferences();
        applyThemePreference();
    });

    refs.refreshBtn.addEventListener('click', () => {
        loadCoins(false);
    });

    refs.coinsGrid.addEventListener('click', (event) => {
        const button = event.target.closest('[data-action="toggle-favorite"]');
        if (!button) {
            return;
        }

        toggleFavorite(button.dataset.coinId);
    });
}

function init() {
    hydrateStateFromStorage();
    syncControlsFromState();
    applyThemePreference();
    bindEvents();

    loadCoins(true);
}

init();

export default init;
