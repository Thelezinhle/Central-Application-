import University from '../models/University.js';
import { 
    searchUniversitiesGlobal, 
    seedUniversitiesFromAPI,
    fetchFromHipoAPI,
    fetchFromWikidata,
    fetchFromOpenStreetMap,
    fetchFromOpenAlex,
    fetchUniversitiesByCountryMultiSource
} from '../utils/universitiesAPI.js';

export const getUniversities = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;
        const country = req.query.country;

        let query = { isActive: true };
        
        // Filter by country if provided
        if (country) {
            query.country = { $regex: country, $options: 'i' };
        }

        const universities = await University.find(query)
            .skip(skip)
            .limit(limit)
            .sort({ name: 1 });

        const total = await University.countDocuments(query);

        res.json({
            success: true,
            universities,
            pagination: { page, limit, total, pages: Math.ceil(total / limit) }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getUniversityById = async (req, res) => {
    try {
        const university = await University.findById(req.params.id);
        if (!university) {
            return res.status(404).json({ message: 'University not found' });
        }
        res.json(university);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createUniversity = async (req, res) => {
    try {
        const university = new University(req.body);
        await university.save();
        res.status(201).json(university);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUniversity = async (req, res) => {
    try {
        const university = await University.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );
        res.json(university);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUniversity = async (req, res) => {
    try {
        await University.findByIdAndUpdate(req.params.id, { isActive: false });
        res.json({ message: 'University deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Search universities globally using free API
 * GET /api/universities/search/global?query=...
 */
export const searchUniversitiesAPI = async (req, res) => {
    try {
        const { query, country } = req.query;

        if (!query && !country) {
            return res.status(400).json({ message: 'Please provide a search query or country' });
        }

        let universities;

        if (country) {
            // Search by country
            const response = await fetch(`http://universities.hipolabs.com/search?country=${encodeURIComponent(country)}`);
            if (!response.ok) throw new Error('API error');
            universities = await response.json();
        } else {
            // Search by name
            universities = await searchUniversitiesGlobal(query);
        }

        // Transform response
        const transformed = universities.map(uni => ({
            name: uni.name,
            country: uni.country,
            domains: uni.domains || [],
            webPages: uni.web_pages || [],
            website: uni.web_pages?.[0] || null
        }));

        res.json({
            count: transformed.length,
            universities: transformed,
            source: 'hipolabs.com API'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Seed universities from API
 * POST /api/universities/seed-from-api
 * Admin only
 */
export const seedFromAPI = async (req, res) => {
    try {
        const { countries } = req.body;

        if (!countries || !Array.isArray(countries) || countries.length === 0) {
            return res.status(400).json({ message: 'Please provide an array of countries' });
        }

        const count = await seedUniversitiesFromAPI(countries, University);

        res.json({
            message: `Successfully seeded ${count} universities from API`,
            count,
            countries
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Search with multi-source enrichment
 * GET /api/universities/search/enriched?country=south+africa
 */
export const searchEnriched = async (req, res) => {
    try {
        const { country, countryCode = 'ZA' } = req.query;

        if (!country) {
            return res.status(400).json({ message: 'Please provide a country name' });
        }

        const universities = await fetchUniversitiesByCountryMultiSource(country, countryCode);

        res.json({
            count: universities.length,
            country,
            universities,
            message: 'Data from Hipo, Wikidata, OpenStreetMap, and OpenAlex - All Free!'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Get filtered universities only (no other institutions)
 * Filters out companies, organizations, etc.
 * GET /api/universities/filtered?country=south+africa
 */
export const getFilteredUniversities = async (req, res) => {
    try {
        const { country = 'south africa', limit = 100 } = req.query;

        // Query OpenAlex specifically for universities
        const response = await fetch(
            `https://api.openalex.org/institutions?` +
            `filter=type:education&search=${encodeURIComponent(country)}&per_page=${limit}`
        );

        if (!response.ok) throw new Error('OpenAlex API error');
        const data = await response.json();

        // Filter to only include universities, colleges, institutes (education institutions)
        const universities = data.results
            ?.filter(inst => {
                const name = inst.display_name?.toLowerCase() || '';
                // Only include actual universities/colleges/institutes
                return (
                    inst.type === 'education' ||
                    inst.type === 'university' ||
                    name.includes('university') ||
                    name.includes('college') ||
                    name.includes('institute') ||
                    name.includes('polytechnic') ||
                    name.includes('academy')
                );
            })
            .map(inst => ({
                id: inst.id,
                name: inst.display_name,
                country: inst.country_code?.toUpperCase(),
                city: inst.geo?.city,
                website: inst.homepage_url,
                type: inst.type,
                ranking: inst.cited_by_count,
                established: inst.founded_year
            }))
            .sort((a, b) => (b.ranking || 0) - (a.ranking || 0)) || [];

        res.json({
            count: universities.length,
            country,
            universities,
            source: 'OpenAlex (Filtered Universities Only)'
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message,
            message: 'Failed to fetch universities'
        });
    }
};
/**
 * Get all real South African universities with courses
 * GET /api/universities/real/south-africa
 */
export const getRealSouthAfricanUniversities = async (req, res) => {
    try {
        const { REAL_UNIVERSITIES } = await import('../data/universitiesData.js');
        const { REAL_COURSES } = await import('../data/realCoursesData.js');

        // Filter only South African universities
        const saUniversities = Object.values(REAL_UNIVERSITIES).filter(uni => 
            uni.location.toLowerCase().includes('south africa') || 
            uni.location.toLowerCase().includes('gauteng') ||
            uni.location.toLowerCase().includes('western cape') ||
            uni.location.toLowerCase().includes('kzn') ||
            uni.location.toLowerCase().includes('eastern cape') ||
            uni.location.toLowerCase().includes('limpopo') ||
            uni.location.toLowerCase().includes('pretoria') ||
            uni.location.toLowerCase().includes('cape town') ||
            uni.location.toLowerCase().includes('johannesburg') ||
            uni.location.toLowerCase().includes('durban') ||
            uni.location.toLowerCase().includes('stellenbosch')
        );

        // Add course info to each university
        const universitiesWithCourses = saUniversities.map(uni => ({
            ...uni,
            coursesCount: REAL_COURSES[uni.id]?.length || 0,
            courses: REAL_COURSES[uni.id] || []
        }));

        // Sort alphabetically
        universitiesWithCourses.sort((a, b) => a.name.localeCompare(b.name));

        res.json({
            success: true,
            count: universitiesWithCourses.length,
            country: "South Africa",
            universities: universitiesWithCourses
        });
    } catch (error) {
        console.error('Error fetching SA universities:', error);
        res.status(500).json({ 
            error: error.message,
            message: 'Failed to fetch South African universities'
        });
    }
};

// Get all real South African universities
export const getAllSouthAfricanUniversities = async (req, res) => {
    try {
        const { REAL_UNIVERSITIES } = await import('../data/universitiesData.js');
        const { REAL_COURSES } = await import('../data/realCoursesData.js');

        // All universities in this dataset are South African, or filter by South African provinces
        const saProvinces = ['gauteng', 'western cape', 'kwazulu-natal', 'eastern cape', 'limpopo', 'mpumalanga', 'free state', 'northern cape', 'north-west'];
        const saUniversities = REAL_UNIVERSITIES.filter(uni => {
            const location = uni.location.toLowerCase();
            return saProvinces.some(province => location.includes(province));
        });

        // Map with course information
        const universitiesWithInfo = saUniversities.map(uni => {
            const courses = REAL_COURSES[uni.id] || [];
            return {
                ...uni,
                coursesCount: courses.length,
                apsRange: courses.length > 0 ? {
                    min: Math.min(...courses.map(c => c.minAPS)),
                    max: Math.max(...courses.map(c => c.minAPS))
                } : null
            };
        });

        // Sort by name
        universitiesWithInfo.sort((a, b) => a.name.localeCompare(b.name));

        res.json({
            success: true,
            count: universitiesWithInfo.length,
            country: "South Africa",
            universities: universitiesWithInfo
        });
    } catch (error) {
        console.error('Error fetching all SA universities:', error);
        res.status(500).json({ 
            success: false,
            error: error.message,
            message: 'Failed to fetch South African universities'
        });
    }
};

// Get universities by province
export const getUniversitiesByProvince = async (req, res) => {
    try {
        const { province } = req.params;

        if (!province) {
            return res.status(400).json({
                success: false,
                message: 'Province parameter is required'
            });
        }

        // Find universities by province (case-insensitive)
        const universities = await University.find({
            'address.province': { $regex: province, $options: 'i' }
        }).sort({ name: 1 });

        res.json({
            success: true,
            province,
            count: universities.length,
            universities
        });
    } catch (error) {
        console.error('Error fetching universities by province:', error);
        res.status(500).json({ 
            success: false,
            error: error.message,
            message: 'Failed to fetch universities by province'
        });
    }
};
