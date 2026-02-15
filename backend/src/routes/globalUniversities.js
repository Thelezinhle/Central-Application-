// src/routes/globalUniversities.js
// This file defines routes for accessing South African university data

import express from 'express';
import {
    REAL_UNIVERSITIES,
    getUniversitiesByRegion,
    getUniversitiesByType,
    searchUniversities
} from '../data/expandedUniversities.js';

const router = express.Router();

console.log('✅ South African Universities Router loaded with', REAL_UNIVERSITIES.length, 'universities');

/**
 * GET /api/global-universities
 * Get all universities with pagination
 */
router.get('/', (req, res) => {
    console.log('📍 GET /api/global-universities called');
    console.log('   Query params:', req.query);
    try {
        console.log('   → Parsing parameters...');
        const pageNum = req.query.page ? parseInt(req.query.page) : 1;
        const limitNum = req.query.limit ? parseInt(req.query.limit) : 50;
        const sort = req.query.sort || 'name';
        
        console.log(`   → Params: page=${pageNum}, limit=${limitNum}, sort=${sort}`);
        console.log(`   → Total universities available: ${REAL_UNIVERSITIES.length}`);
        
        const startIndex = (pageNum - 1) * limitNum;
        const endIndex = startIndex + limitNum;
        
        console.log(`   → Slicing: [${startIndex}:${endIndex}]`);
        
        // Sort universities
        let universities = [...REAL_UNIVERSITIES];
        console.log(`   → Created copy of ${universities.length} universities`);
        
        if (sort === 'name') {
            universities.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sort === 'country') {
            universities.sort((a, b) => a.country.localeCompare(b.country));
        } else if (sort === 'region') {
            universities.sort((a, b) => a.region.localeCompare(b.region));
        }
        
        console.log(`   → Sorted by ${sort}`);
        
        const paginated = universities.slice(startIndex, endIndex);
        console.log(`   → Returning ${paginated.length} universities`);
        
        const response = {
            success: true,
            count: paginated.length,
            total: universities.length,
            page: pageNum,
            pages: Math.ceil(universities.length / limitNum),
            universities: paginated
        };
        
        console.log(`   → Sending response...`);
        res.json(response);
        
    } catch (error) {
        console.error('Error fetching all universities:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch universities',
            message: error.message
        });
    }
});

/**
 * GET /api/global-universities/regions
 * Get list of all regions and their university counts
 */
router.get('/regions', (req, res) => {
    try {
        const regions = {};
        
        REAL_UNIVERSITIES.forEach(uni => {
            if (!regions[uni.region]) {
                regions[uni.region] = 0;
            }
            regions[uni.region]++;
        });
        
        res.json({
            success: true,
            regions: Object.entries(regions).map(([name, count]) => ({
                name,
                count
            })),
            total: Object.values(regions).reduce((sum, count) => sum + count, 0)
        });
        
    } catch (error) {
        console.error('Error fetching regions:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch regions'
        });
    }
});

/**
 * GET /api/global-universities/by-region/:region
 * Get universities by region
 */
router.get('/by-region/:region', (req, res) => {
    try {
        const { region } = req.params;
        const { limit = 500, page = 1 } = req.query;
        
        const universities = getUniversitiesByRegion(region);
        
        if (universities.length === 0) {
            return res.status(404).json({
                success: false,
                error: `No universities found for region: ${region}`
            });
        }
        
        // Apply pagination
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const startIndex = (pageNum - 1) * limitNum;
        const endIndex = startIndex + limitNum;
        
        const paginated = universities.slice(startIndex, endIndex);
        
        res.json({
            success: true,
            count: paginated.length,
            total: universities.length,
            page: pageNum,
            pages: Math.ceil(universities.length / limitNum),
            region: region,
            universities: paginated
        });
        
    } catch (error) {
        console.error('Error fetching universities by region:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/global-universities/by-country/:country
 * Get universities by type (public/private) - legacy route for compatibility
 * Now returns all SA universities since country is always South Africa
 */
router.get('/by-country/:country', (req, res) => {
    try {
        const { limit = 500, page = 1 } = req.query;
        
        // All universities are South African, return all
        const universities = REAL_UNIVERSITIES;
        
        // Apply pagination
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const startIndex = (pageNum - 1) * limitNum;
        const endIndex = startIndex + limitNum;
        
        const paginated = universities.slice(startIndex, endIndex);
        
        res.json({
            success: true,
            count: paginated.length,
            total: universities.length,
            page: pageNum,
            pages: Math.ceil(universities.length / limitNum),
            country: 'South Africa',
            universities: paginated
        });
        
    } catch (error) {
        console.error('Error fetching universities:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/global-universities/search
 * Search universities by name
 */
router.get('/search', (req, res) => {
    try {
        const { q = '' } = req.query;
        
        if (!q || q.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Search query required'
            });
        }
        
        const results = searchUniversities(q);
        
        res.json({
            success: true,
            query: q,
            count: results.length,
            universities: results
        });
        
    } catch (error) {
        console.error('Error searching universities:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/global-universities/:id
 * Get specific university by ID
 */
router.get('/:id', (req, res) => {
    try {
        const { id } = req.params;
        
        const university = REAL_UNIVERSITIES.find(u => 
            u.id === id || u.name.toLowerCase().replace(/\s+/g, '-') === id.toLowerCase()
        );
        
        if (!university) {
            return res.status(404).json({
                success: false,
                error: 'University not found'
            });
        }
        
        res.json({
            success: true,
            university: university
        });
        
    } catch (error) {
        console.error('Error fetching university:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

export default router;
