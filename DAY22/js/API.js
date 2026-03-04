const API_BASE = 'https://api.coingecko.com/api/v3';

export const DEFAULT_MARKET_PARAMS = {
    vs_currency: 'usd',
    order: 'market_cap_desc',
    per_page: 50,
    page: 1,
    sparkline: false,
    price_change_percentage: '24h'
};

export class APIError extends Error {
    constructor(message, code = 'UNKNOWN', status = null) {
        super(message);
        this.name = 'APIError';
        this.code = code;
        this.status = status;
    }
}

function buildMarketUrl(params = {}) {
    const query = new URLSearchParams({
        ...DEFAULT_MARKET_PARAMS,
        ...params
    });

    return `${API_BASE}/coins/markets?${query.toString()}`;
}

export async function fetchCoinMarkets(params = {}) {
    const url = buildMarketUrl(params);

    let response;
    try {
        response = await fetch(url, {
            headers: { Accept: 'application/json' }
        });
    } catch (error) {
        throw new APIError('Network error while contacting CoinGecko.', 'NETWORK_ERROR');
    }

    if (!response.ok) {
        throw new APIError(`CoinGecko request failed (${response.status}).`, 'HTTP_ERROR', response.status);
    }

    let data;
    try {
        data = await response.json();
    } catch (error) {
        throw new APIError('Failed to parse API response JSON.', 'PARSE_ERROR');
    }

    if (!Array.isArray(data) || data.length < 20) {
        throw new APIError('API returned insufficient items (expected at least 20).', 'DATA_ERROR');
    }

    return data;
}

const API = {
    fetchCoinMarkets
};

export default API;
