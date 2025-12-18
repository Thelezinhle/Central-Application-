// src/controllers/globalUniversitiesController.js
// This controller handles global university-related endpoints

import University from '../models/University.js';
import {
    getUniversitiesByCountry,
    searchUniversities,
} from '../utils/apiClient.js';

// Get all universities (from MongoDB with pagination)
// GET /api/global-universities
export const getAllUniversitiesController = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 50;
        const skip = (page - 1) * limit;

        const universities = await University.find()
            .limit(limit)
            .skip(skip)
            .sort({ name: 1 });

        const total = await University.countDocuments();

        return res.status(200).json({
            success: true,
            count: universities.length,
            total,
            page,
            pages: Math.ceil(total / limit),
            data: universities,
        });
    } catch (error) {
        console.error('Error in getAllUniversitiesController:', error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching universities',
            error: error.message,
        });
    }
};

// Get universities by country
// GET /api/global-universities/by-country/:country
export const getUniversitiesByCountryController = async (req, res) => {
    try {
        const { country } = req.params;

        if (!country) {
            return res.status(400).json({
                success: false,
                message: 'Country name is required',
            });
        }

        // Try MongoDB first
        let universities = await University.find({
            country: { $regex: country, $options: 'i' }
        }).limit(100);

        // If not found in DB, fetch from API
        if (universities.length === 0) {
            universities = await getUniversitiesByCountry(country);
        }

        return res.status(200).json({
            success: true,
            count: universities.length,
            country,
            data: universities,
        });
    } catch (error) {
        console.error('Error in getUniversitiesByCountryController:', error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching universities',
            error: error.message,
        });
    }
};

// Search universities
// GET /api/global-universities/search?query=name
export const searchUniversitiesController = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({
                success: false,
                message: 'Search query is required',
            });
        }

        // Search in MongoDB
        let universities = await University.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { country: { $regex: query, $options: 'i' } },
                { domains: { $regex: query, $options: 'i' } }
            ]
        }).limit(100);

        // If not found in DB, try API
        if (universities.length === 0) {
            universities = await searchUniversities(query);
        }

        return res.status(200).json({
            success: true,
            count: universities.length,
            query,
            data: universities,
        });
    } catch (error) {
        console.error('Error in searchUniversitiesController:', error);
        return res.status(500).json({
            success: false,
            message: 'Error searching universities',
            error: error.message,
        });
    }
};

// Get all countries (from MongoDB)
// GET /api/global-universities/countries
export const getCountriesController = async (req, res) => {
    try {
        const countries = await University.distinct('country');
        const sortedCountries = countries.filter(c => c).sort();

        return res.status(200).json({
            success: true,
            count: sortedCountries.length,
            data: sortedCountries,
        });
    } catch (error) {
        console.error('Error in getCountriesController:', error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching countries',
            error: error.message,
        });
    }
};
