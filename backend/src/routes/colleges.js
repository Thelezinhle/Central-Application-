import express from 'express';
import collegesData from '../data/colleges.js';
import collegeCoursesData from '../data/collegeCourses.js';

const router = express.Router();

// Helper to extract province from location string
const extractProvince = (location) => {
    if (!location) return null;
    const parts = location.split(',').map(p => p.trim());
    if (parts.length >= 2) {
        const province = parts[parts.length - 1];
        // Normalize province names
        const normalizedProvinces = {
            'KZN': 'KwaZulu-Natal',
            'KwaZulu-Natal': 'KwaZulu-Natal',
            'Gauteng': 'Gauteng',
            'Western Cape': 'Western Cape',
            'Eastern Cape': 'Eastern Cape',
            'Free State': 'Free State',
            'Limpopo': 'Limpopo',
            'Mpumalanga': 'Mpumalanga',
            'North West': 'North West',
            'Northern Cape': 'Northern Cape'
        };
        return normalizedProvinces[province] || null;
    }
    return null;
};

// Filter to only South African colleges
const getSAColleges = () => {
    return collegesData.filter(college => {
        // Must be from South Africa
        if (college.country !== 'South Africa') return false;
        
        // Must be public or private (not international or african)
        if (college.category === 'international' || college.category === 'african') return false;
        
        return true;
    });
};

// Get all colleges with filters (South Africa only)
router.get('/', (req, res) => {
    const { province, category, type } = req.query;
    
    let filtered = getSAColleges();
    
    if (province) {
        filtered = filtered.filter(college => {
            const collegeProvince = extractProvince(college.location);
            return collegeProvince?.toLowerCase() === province.toLowerCase();
        });
    }
    
    if (category) {
        filtered = filtered.filter(college => college.category === category);
    }
    
    if (type) {
        filtered = filtered.filter(college => college.type?.toLowerCase().includes(type.toLowerCase()));
    }
    
    res.json({
        count: filtered.length,
        colleges: filtered.sort((a, b) => a.name.localeCompare(b.name))
    });
});

// Get available provinces
router.get('/provinces', (req, res) => {
    const saColleges = getSAColleges();
    const provinces = [...new Set(saColleges.map(c => extractProvince(c.location)).filter(p => p !== null))].sort();
    
    res.json({
        count: provinces.length,
        provinces: provinces
    });
});

// Get colleges by country
router.get('/country/:country', (req, res) => {
    const country = req.params.country.toLowerCase();
    
    const countryColleges = collegesData.filter(college => {
        const collegeCountry = college.country?.toLowerCase() || '';
        const collegeLocation = college.location?.toLowerCase() || '';
        return collegeCountry.includes(country) || collegeLocation.includes(country);
    });
    
    res.json({
        country: country,
        count: countryColleges.length,
        colleges: countryColleges
    });
});

// Get South African colleges
router.get('/south-africa/all', (req, res) => {
    const saColleges = collegesData.filter(college => 
        college.category === 'private' || 
        college.category === 'tvet' ||
        college.location?.toLowerCase().includes('south africa')
    );
    
    res.json({
        count: saColleges.length,
        colleges: saColleges.sort((a, b) => a.name.localeCompare(b.name))
    });
});

// Get college details with courses
router.get('/:id', (req, res) => {
    const collegeId = req.params.id;
    const college = collegesData.find(c => c.id === collegeId);
    
    if (!college) {
        return res.status(404).json({ error: 'College not found' });
    }
    
    const courses = collegeCoursesData[collegeId] || [];
    
    res.json({
        ...college,
        coursesCount: courses.length,
        courses: courses
    });
});

// Get courses for a college
router.get('/:id/courses', (req, res) => {
    const collegeId = req.params.id;
    const college = collegesData.find(c => c.id === collegeId);
    const courses = collegeCoursesData[collegeId] || [];
    
    if (!college) {
        return res.status(404).json({ error: 'College not found' });
    }
    
    res.json({
        college: college.name,
        collegeId: collegeId,
        count: courses.length,
        courses: courses
    });
});

// Search colleges
router.get('/search', (req, res) => {
    const { q, country, category } = req.query;
    
    let results = collegesData.filter(college => {
        // Country filter
        if (country && !college.location?.toLowerCase().includes(country.toLowerCase())) {
            return false;
        }
        
        // Category filter
        if (category && college.category !== category) {
            return false;
        }
        
        // Search query
        if (q) {
            const query = q.toLowerCase();
            return (
                college.name.toLowerCase().includes(query) ||
                college.type?.toLowerCase().includes(query) ||
                college.location?.toLowerCase().includes(query)
            );
        }
        
        return true;
    });
    
    res.json({
        count: results.length,
        results: results.sort((a, b) => a.name.localeCompare(b.name))
    });
});

export default router;
