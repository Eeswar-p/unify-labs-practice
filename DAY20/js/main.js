// ============= TAB SWITCHING =============

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const tabName = e.currentTarget.dataset.tab;
        switchTab(tabName);
    });
});

function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active from buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(`${tabName}-tab`).classList.add('active');
    
    // Activate button
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
}

// ============= WEATHER APP (FETCH & ASYNC/AWAIT) =============

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherLoader = document.getElementById('weatherLoader');
const weatherError = document.getElementById('weatherError');
const weatherDisplay = document.getElementById('weatherDisplay');
const weatherEmpty = document.getElementById('weatherEmpty');

searchBtn.addEventListener('click', searchWeather);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchWeather();
});

/**
 * Fetch weather data using async/await
 * Demonstrates: async function, await fetch, error handling with try/catch
 */
async function searchWeather() {
    const city = cityInput.value.trim();
    
    if (!city) {
        showWeatherError('Please enter a city name');
        return;
    }
    
    try {
        // Show loading spinner
        showWeatherLoader(true);
        hideWeatherError();
        
        // Fetch weather data using async/await
        const weatherData = await fetchWeatherData(city);
        
        // Display the weather
        displayWeather(weatherData);
        weatherEmpty.classList.add('hidden');
        
    } catch (error) {
        showWeatherError(error.message);
        weatherDisplay.classList.add('hidden');
        weatherEmpty.classList.add('hidden');
    } finally {
        // Hide loading spinner
        showWeatherLoader(false);
    }
}

/**
 * Async function to fetch weather from Open-Meteo API
 * Demonstrates: fetch(), await, response handling, error checking
 */
async function fetchWeatherData(city) {
    // Geocoding API to get coordinates
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
    
    // Fetch geo data
    const geoResponse = await fetch(geoUrl);
    
    // Check if request was successful
    if (!geoResponse.ok) {
        throw new Error(`HTTP error! status: ${geoResponse.status}`);
    }
    
    // Parse JSON response
    const geoData = await geoResponse.json();
    
    // Check if city was found
    if (!geoData.results || geoData.results.length === 0) {
        throw new Error(`City "${city}" not found. Try another city name.`);
    }
    
    const location = geoData.results[0];
    const { latitude, longitude, name, country, admin1 } = location;
    
    // Weather API URL
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,apparent_temperature&temperature_unit=celsius`;
    
    // Fetch weather data
    const weatherResponse = await fetch(weatherUrl);
    
    if (!weatherResponse.ok) {
        throw new Error('Failed to fetch weather data');
    }
    
    const weatherJson = await weatherResponse.json();
    const current = weatherJson.current;
    
    // Return combined data
    return {
        name,
        country,
        admin1,
        latitude,
        longitude,
        temperature: current.temperature_2m,
        humidity: current.relative_humidity_2m,
        feelsLike: current.apparent_temperature,
        windSpeed: current.wind_speed_10m,
        description: getWeatherDescription(current.weather_code)
    };
}

/**
 * Convert WMO weather codes to descriptions
 */
function getWeatherDescription(code) {
    const descriptions = {
        0: 'Clear Sky',
        1: 'Mainly Clear',
        2: 'Partly Cloudy',
        3: 'Overcast',
        45: 'Foggy',
        48: 'Depositing Rime Fog',
        51: 'Light Drizzle',
        53: 'Moderate Drizzle',
        55: 'Dense Drizzle',
        61: 'Slight Rain',
        63: 'Moderate Rain',
        65: 'Heavy Rain',
        71: 'Slight Snow',
        73: 'Moderate Snow',
        75: 'Heavy Snow',
        77: 'Snow Grains',
        80: 'Slight Rain Showers',
        81: 'Moderate Rain Showers',
        82: 'Violent Rain Showers',
        85: 'Slight Snow Showers',
        86: 'Heavy Snow Showers',
        95: 'Thunderstorm'
    };
    return descriptions[code] || 'Unknown';
}

/**
 * Display weather data in the UI
 */
function displayWeather(data) {
    document.getElementById('cityName').textContent = `${data.name}, ${data.country}`;
    document.getElementById('weatherDesc').textContent = data.description;
    document.getElementById('temperature').textContent = `${Math.round(data.temperature)}°C`;
    document.getElementById('windSpeed').textContent = `${data.windSpeed} km/h`;
    document.getElementById('humidity').textContent = `${data.humidity}%`;
    document.getElementById('feelsLike').textContent = `${Math.round(data.feelsLike)}°C`;
    document.getElementById('coordinates').textContent = 
        `${Math.round(data.latitude * 10) / 10}°N, ${Math.round(data.longitude * 10) / 10}°W`;
    
    weatherDisplay.classList.remove('hidden');
}

function showWeatherLoader(show) {
    if (show) {
        weatherLoader.classList.remove('hidden');
    } else {
        weatherLoader.classList.add('hidden');
    }
}

function showWeatherError(message) {
    weatherError.textContent = `❌ ${message}`;
    weatherError.classList.remove('hidden');
}

function hideWeatherError() {
    weatherError.classList.add('hidden');
}

// ============= POSTS VIEWER (JSONPLACEHOLDER) =============

const loadPostsBtn = document.getElementById('loadPostsBtn');
const userFilter = document.getElementById('userFilter');
const postSearch = document.getElementById('postSearch');
const postsLoader = document.getElementById('postsLoader');
const postsError = document.getElementById('postsError');
const postsEmpty = document.getElementById('postsEmpty');
const postsList = document.getElementById('postsList');

let allPosts = []; // Store all posts for filtering

loadPostsBtn.addEventListener('click', loadPosts);
userFilter.addEventListener('change', filterPosts);
postSearch.addEventListener('input', filterPosts);

/**
 * Fetch posts from JSONPlaceholder API
 * Demonstrates: async/await, error handling, data display
 */
async function loadPosts() {
    try {
        showPostsLoader(true);
        hidePostsError();
        
        // Fetch posts using async/await
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        // Check if request was successful
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        // Parse JSON
        allPosts = await response.json();
        
        // Display posts
        filterPosts();
        postsEmpty.classList.add('hidden');
        
    } catch (error) {
        showPostsError(`Failed to load posts: ${error.message}`);
    } finally {
        showPostsLoader(false);
    }
}

/**
 * Filter posts based on user and search
 */
function filterPosts() {
    const selectedUser = userFilter.value;
    const searchTerm = postSearch.value.toLowerCase();
    
    // Filter posts
    const filtered = allPosts.filter(post => {
        const matchesUser = !selectedUser || post.userId === parseInt(selectedUser);
        const matchesSearch = !searchTerm || post.title.toLowerCase().includes(searchTerm);
        return matchesUser && matchesSearch;
    });
    
    // Display filtered posts
    if (filtered.length === 0) {
        postsList.innerHTML = '<div class="empty-state"><div class="empty-icon">🔍</div><p>No posts found</p></div>';
        return;
    }
    
    postsList.innerHTML = filtered.map(post => `
        <div class="post-card">
            <span class="post-user">User ${post.userId}</span>
            <h3 class="post-title">${post.title}</h3>
            <p class="post-body">${post.body}</p>
            <div class="post-meta">
                <span>📝 Post #${post.id}</span>
            </div>
        </div>
    `).join('');
}

function showPostsLoader(show) {
    postsLoader.classList.toggle('hidden', !show);
}

function showPostsError(message) {
    postsError.textContent = `❌ ${message}`;
    postsError.classList.remove('hidden');
}

function hidePostsError() {
    postsError.classList.add('hidden');
}

// ============= USERS DIRECTORY =============

const loadUsersBtn = document.getElementById('loadUsersBtn');
const userSearch = document.getElementById('userSearch');
const usersLoader = document.getElementById('usersLoader');
const usersError = document.getElementById('usersError');
const usersEmpty = document.getElementById('usersEmpty');
const usersList = document.getElementById('usersList');

let allUsers = []; // Store all users for searching

loadUsersBtn.addEventListener('click', loadUsers);
userSearch.addEventListener('input', searchUsers);

/**
 * Fetch users from JSONPlaceholder API
 * Demonstrates: async/await, error handling, API integration
 */
async function loadUsers() {
    try {
        showUsersLoader(true);
        hideUsersError();
        
        // Fetch users
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        allUsers = await response.json();
        
        // Display users
        displayUsers(allUsers);
        usersEmpty.classList.add('hidden');
        
    } catch (error) {
        showUsersError(`Failed to load users: ${error.message}`);
    } finally {
        showUsersLoader(false);
    }
}

/**
 * Search users by name
 */
function searchUsers() {
    const searchTerm = userSearch.value.toLowerCase();
    
    const filtered = allUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.username.toLowerCase().includes(searchTerm)
    );
    
    displayUsers(filtered.length > 0 ? filtered : []); 
}

/**
 * Display users in grid
 */
function displayUsers(users) {
    if (users.length === 0) {
        usersList.innerHTML = '<div class="empty-state" style="grid-column: 1/-1;"><div class="empty-icon">🔍</div><p>No users found</p></div>';
        return;
    }
    
    usersList.innerHTML = users.map(user => {
        const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();
        return `
            <div class="user-card">
                <div class="user-avatar">${initials}</div>
                <h3 class="user-name">${user.name}</h3>
                <p class="user-username">@${user.username}</p>
                <div class="user-info">
                    <div class="user-info-item">
                        <span class="user-info-label">📧 Email:</span> ${user.email}
                    </div>
                    <div class="user-info-item">
                        <span class="user-info-label">📞 Phone:</span> ${user.phone}
                    </div>
                    <div class="user-info-item">
                        <span class="user-info-label">🌐 Website:</span> ${user.website}
                    </div>
                    <div class="user-info-item">
                        <span class="user-info-label">🏢 Company:</span> ${user.company.name}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function showUsersLoader(show) {
    usersLoader.classList.toggle('hidden', !show);
}

function showUsersError(message) {
    usersError.textContent = `❌ ${message}`;
    usersError.classList.remove('hidden');
}

function hideUsersError() {
    usersError.classList.add('hidden');
}

// ============= INITIALIZATION =============

console.log('🌐 API Integration Master Ready!');
console.log('✅ Try searching for a city in the Weather App');
console.log('📝 Click "Load All Posts" in the Posts Viewer');
console.log('👥 Click "Load Users" in the Users Directory');
console.log('💡 Check DevTools Console to see fetch requests');

// ============= LEARNING NOTES =============

/**
 * KEY CONCEPTS DEMONSTRATED:
 * 
 * 1. FETCH API
 *    - fetch(url) - Makes HTTP request
 *    - Returns a Promise that resolves to Response object
 *    - Response.ok checks for successful HTTP status (200-299)
 *    - Response.json() parses JSON body
 * 
 * 2. ASYNC/AWAIT
 *    - async function declares function returns Promise
 *    - await pauses execution until Promise resolves
 *    - Results can be assigned to variables
 *    - Makes async code look synchronous and readable
 * 
 * 3. ERROR HANDLING
 *    - try/catch blocks handle Promise rejections
 *    - Network errors, bad JSON, etc. throw errors
 *    - finally block runs regardless of success/failure
 *    - Always check response.ok before parsing JSON
 * 
 * 4. PRACTICAL PATTERNS
 *    - Show loader while fetching
 *    - Handle errors gracefully with user messages
 *    - Update DOM only after successful fetch
 *    - Store data for client-side filtering/searching
 *    - Use finally block to cleanup loading states
 * 
 * 5. API INTEGRATION
 *    - fetch() works with any public API
 *    - Some APIs require API keys (pass in headers)
 *    - Open-Meteo needs no key (free weather data)
 *    - JSONPlaceholder provides free test data
 * 
 * IMPROVEMENT IDEAS:
 * - Add request timeout with AbortController
 * - Cache API responses locally
 * - Implement pagination for large datasets
 * - Add retry logic for failed requests
 * - Use Promise.all() for parallel requests
 * - Add data caching with localStorage
 */
