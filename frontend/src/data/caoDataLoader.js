// Parse CAO programmes data and organize by institution with all courses
import caoData from './cao_programmes.json';

export const allCAOProgrammes = caoData;

// Group programmes by institution code (extracted from course code)
export const programmesByInstitution = caoData.reduce((acc, programme) => {
    const code = programme.code.split('-')[0]; // Extract institution code
    if (!acc[code]) {
        acc[code] = [];
    }
    acc[code].push(programme);
    return acc;
}, {});

// Map of institution codes to full names
const institutionCodeMap = {
    'ZU': 'Zululand University',
    'UP': 'University of Pretoria',
    'SU': 'Stellenbosch University',
    'UCT': 'University of Cape Town',
    'WITS': 'University of the Witwatersrand',
    'UJ': 'University of Johannesburg',
    'NWU': 'North-West University',
    'UFS': 'University of the Free State',
    'UNISA': 'University of South Africa',
    'UKZN': 'University of KwaZulu-Natal',
    'DUT': 'Durban University of Technology',
    'TUT': 'Tshwane University of Technology',
    'CPUT': 'Cape Peninsula University of Technology',
    'VUT': 'Vaal University of Technology',
    'KN': 'University of KwaZulu-Natal',
    'DU': 'Durban University of Technology',
    'MN': 'Mangosuthu University of Technology',
    'MUT': 'Mangosuthu University of Technology',
    'CUT': 'Central University of Technology',
    'CUT-FS': 'Central University of Technology Free State',
    'EUT': 'Ekurhuleni University of Technology',
    'FUT': 'Freshwater University of Technology',
    'IUT': 'Ikhala University of Technology',
    'NUT': 'Natal University of Technology',
    'WUT': 'West Coast University of Technology',
    'PMB': 'Pietermaritzburg University',
    'JNB': 'Johannesburg University',
    'CPT': 'Cape Town University',
    'DBN': 'Durban Campus',
    'JBN': 'Johannesburg Campus',
    // Private Colleges
    'AA': 'Academy of the Arts',
    'MC': 'Milpark Education',
    'PE': 'IIE (Pearson Institute)',
    'PX': 'Eduvos',
    'RB': 'Rosebank College',
    'BT': 'Boston City Campus',
    'DC': 'Damelin College',
    'EM': 'Eduvos',
    'BC': 'Boston City Campus',
    'DM': 'Damelin College',
    'VC': 'Varsity College',
    'MB': 'Monash South Africa',
    'DV': 'Eduvos',
    'CM': 'Covenant University',
    'LCI': 'LCI Education South Africa'
};

// Get all institutions with their programmes
export const getAllInstitutions = () => {
    const institutions = {};
    
    caoData.forEach(programme => {
        const code = programme.code.split('-')[0];
        const institutionName = institutionCodeMap[code] || code;
        
        if (!institutions[institutionName]) {
            institutions[institutionName] = {
                name: institutionName,
                code: code,
                type: programme.institution,
                programmes: [],
                categories: new Set(),
                codes: new Set()
            };
        }
        
        institutions[institutionName].programmes.push(programme);
        institutions[institutionName].categories.add(programme.category);
        institutions[institutionName].codes.add(code);
    });
    
    // Convert Sets to Arrays
    Object.keys(institutions).forEach(key => {
        institutions[key].categories = Array.from(institutions[key].categories);
        institutions[key].codes = Array.from(institutions[key].codes);
    });
    
    return institutions;
};

// Get programmes by category
export const getProgrammesByCategory = () => {
    const categories = {};
    
    caoData.forEach(programme => {
        if (!categories[programme.category]) {
            categories[programme.category] = [];
        }
        categories[programme.category].push(programme);
    });
    
    return categories;
};

// Get programmes grouped by institution name
export const getProgrammesByInstitution = () => {
    const institutions = {};
    caoData.forEach(programme => {
        const code = programme.code.split('-')[0];
        const institutionName = institutionCodeMap[code] || code;
        
        if (!institutions[institutionName]) {
            institutions[institutionName] = [];
        }
        
        // Add entry points field based on programme code
        const programmeWithEntryPoints = {
            ...programme,
            entryPoints: getEntryPoints(programme.code)
        };
        
        institutions[institutionName].push(programmeWithEntryPoints);
    });
    return institutions;
};

// Helper function to determine entry points based on programme code
const getEntryPoints = (code) => {
    // Extract the middle part of the code to determine level
    const parts = code.split('-');
    if (parts.length < 2) return '30-40 points';
    
    const level = parts[1];
    
    switch(level) {
        case 'M': return '40-50 points (Bachelor)';
        case 'P': return '32-40 points (Diploma)';
        case 'D': return '24-32 points (Advanced Certificate)';
        case 'N': return '24-32 points (Diploma)';
        case 'C': return '20-28 points (Certificate)';
        case 'B': return '28-36 points (Bachelor)';
        case 'A': return '30-42 points (Master/Advanced)';
        default: return '30-40 points';
    }
};

// Search programmes by code, name, or category
export const searchProgrammes = (query) => {
    const lowerQuery = query.toLowerCase();
    return caoData.filter(programme => 
        programme.code.toLowerCase().includes(lowerQuery) ||
        programme.name.toLowerCase().includes(lowerQuery) ||
        programme.category.toLowerCase().includes(lowerQuery)
    );
};

// Get unique institutions
export const getUniqueInstitutions = () => {
    const institutions = new Set();
    caoData.forEach(programme => {
        const code = programme.code.split('-')[0];
        const institutionName = institutionCodeMap[code] || code;
        institutions.add(institutionName);
    });
    return Array.from(institutions);
};

// Get programmes count by institution
export const getProgrammesCountByInstitution = () => {
    const counts = {};
    caoData.forEach(programme => {
        counts[programme.institution] = (counts[programme.institution] || 0) + 1;
    });
    return counts;
};

export default {
    allCAOProgrammes,
    programmesByInstitution: programmesByInstitution,
    getAllInstitutions,
    getProgrammesByCategory,
    getProgrammesByInstitution,
    searchProgrammes,
    getUniqueInstitutions,
    getProgrammesCountByInstitution
};
