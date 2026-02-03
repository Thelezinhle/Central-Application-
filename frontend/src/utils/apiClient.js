import axios from 'axios';

// Cache for API requests
const requestCache = new Map();
const pendingRequests = new Map();

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Get cached data if available and not expired
 */
const getCachedData = (url) => {
    const cached = requestCache.get(url);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
    }
    // Remove expired cache
    if (cached) {
        requestCache.delete(url);
    }
    return null;
};

/**
 * Enhanced API client with caching and request deduplication
 */
export const apiClient = axios.create({
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

/**
 * GET request with caching and deduplication
 */
export const cachedGet = async (url, config = {}) => {
    // Check if request is already pending (deduplication)
    if (pendingRequests.has(url)) {
        return pendingRequests.get(url);
    }

    // Check cache first
    const cached = getCachedData(url);
    if (cached) {
        return Promise.resolve(cached);
    }

    // Make new request
    const request = apiClient.get(url, config)
        .then(response => {
            const data = response.data;
            // Cache successful response
            requestCache.set(url, { data, timestamp: Date.now() });
            return data;
        })
        .finally(() => {
            // Remove from pending requests
            pendingRequests.delete(url);
        });

    // Store pending request
    pendingRequests.set(url, request);

    return request;
};

/**
 * POST request (not cached)
 */
export const apiPost = (url, data, config = {}) => {
    return apiClient.post(url, data, config)
        .then(response => response.data);
};

/**
 * Clear all caches
 */
export const clearCache = () => {
    requestCache.clear();
    pendingRequests.clear();
};

/**
 * Clear specific cache entry
 */
export const clearCacheEntry = (url) => {
    requestCache.delete(url);
};

export default apiClient;
