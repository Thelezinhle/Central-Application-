import express from 'express';
import collegesData from '../data/colleges.js';
import collegeCoursesData from '../data/collegeCourses.js';

const router = express.Router();

// Get all colleges with filters
router.get('/', (req, res) => {
    const { country, category, type } = req.query;
    
    let filtered = [...collegesData];
    
    if (country) {
        filtered = filtered.filter(college => 
            college.country?.toLowerCase().includes(country.toLowerCase()) ||
            college.location?.toLowerCase().includes(country.toLowerCase())
        );
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
