// src/utils/apiClient.js
// This utility handles all external API calls

import axios from 'axios';

// Initialize RapidAPI client for universities
const rapidAPIClient = axios.create({
    baseURL: 'https://open-universities.p.rapidapi.com',
    headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': process.env.RAPIDAPI_HOST,
    },
});

// Get universities by country
export const getUniversitiesByCountry = async (country) => {
    try {
        const response = await rapidAPIClient.get('/search', {
            params: {
                country: country.toLowerCase(),
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching universities:', error);
        throw error;
    }
};

// Search universities by name
export const searchUniversities = async (query) => {
    try {
        const response = await rapidAPIClient.get('/search', {
            params: {
                name: query.toLowerCase(),
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error searching universities:', error);
        throw error;
    }
};

// Get all countries with universities
export const getAllCountries = async () => {
    try {
        // This would require parsing data from the API
        // For now, return a list of countries
        const countries = [
            'South Africa', 'USA', 'UK', 'Canada', 'Australia',
            'Germany', 'France', 'Spain', 'India', 'China',
            'Japan', 'Brazil', 'Mexico', 'Australia', 'Netherlands',
            'Sweden', 'Switzerland', 'Singapore', 'Kenya', 'Egypt',
        ];
        return countries;
    } catch (error) {
        console.error('Error getting countries:', error);
        throw error;
    }
};

// Get Geonames data if needed (optional)
export const getCountryInfo = async (countryName) => {
    try {
        if (!process.env.GEONAMES_USERNAME) {
            console.warn('Geonames not configured');
            return null;
        }

        const response = await axios.get('http://api.geonames.org/searchJSON', {
            params: {
                q: countryName,
                featureClass: 'A', // Administrative regions
                username: process.env.GEONAMES_USERNAME,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error getting country info:', error);
        throw error;
    }
};

export default {
    getUniversitiesByCountry,
    searchUniversities,
    getAllCountries,
    getCountryInfo,
};
