// ============================================================================
// CODE DECODER UTILITY - Frontend Helper
// Use this in components to help users understand course codes
// ============================================================================

import { decodeCode, codeReferenceGuide } from '../data/codeReference.js';

/**
 * CodeDecoder Component Helper
 * Provides methods to explain course codes in user-friendly ways
 */

export class CodeDecoder {
    /**
     * Get simple explanation of a course code
     * Example: "ZU-M-BAS" → "Master's in Business Accounting from Zululand University"
     */
    static getSimpleExplanation(courseCode) {
        const decoded = decodeCode(courseCode);
        if (decoded.error) return "Unknown code format";
        return decoded.explanation;
    }

    /**
     * Get detailed breakdown with visual formatting
     */
    static getDetailedBreakdown(courseCode) {
        const decoded = decodeCode(courseCode);
        if (decoded.error) return null;

        return {
            code: decoded.originalCode,
            institution: decoded.university,
            institutionType: decoded.universityType,
            institutionLocation: decoded.universityLocation,
            studyLevel: decoded.level,
            program: decoded.program,
            estimatedDuration: decoded.duration,
            fullDescription: decoded.explanation
        };
    }

    /**
     * Get color code based on institution type (for UI highlighting)
     */
    static getInstitutionColor(universityPrefix) {
        const typeMap = {
            "Public University": "#4A90E2",      // Blue
            "Private College": "#F5A623",        // Orange
            "TVET College": "#7ED321",           // Green
            "Specialist Arts College": "#BD10E0", // Purple
            "Private Tertiary": "#50E3C2"        // Teal
        };

        const university = codeReferenceGuide.universityPrefixes[universityPrefix];
        return typeMap[university?.type] || "#999999"; // Gray for unknown
    }

    /**
     * Get icon/category based on program type
     */
    static getProgramCategory(programAbbreviation) {
        const categories = {
            accounting: ['ACC', 'BAS', 'BCN', 'FIN', 'BSF', 'BSI'],
            technology: ['IT', 'ITSS', 'CS', 'SOFT', 'NET'],
            business: ['BUS', 'HRM', 'OFFICE', 'MKT', 'COMM'],
            engineering: ['ENG', 'ELEC', 'MECH', 'CIVIL', 'AUTO'],
            healthcare: ['HEALTH', 'NURS', 'MED'],
            trades: ['WELD', 'PLUMB', 'CONST', 'MAINT'],
            education: ['TEACH', 'ECD'],
            hospitality: ['HOSP', 'TOUR', 'CHEF']
        };

        for (const [category, codes] of Object.entries(categories)) {
            if (codes.some(code => programAbbreviation.includes(code))) {
                return category;
            }
        }
        return 'other';
    }

    /**
     * Format code with visual separators for readability
     * Example: "ZU-M-BAS" displayed as "ZU | M | BAS"
     */
    static formatCodeVisually(courseCode) {
        return courseCode.split('-').join(' | ');
    }

    /**
     * Get list of all codes for a specific university
     */
    static getCodesByUniversity(universityName) {
        const codes = codeReferenceGuide.universityPrefixes[universityName];
        if (!codes) return [];
        return codes;
    }

    /**
     * Validate if a course code follows proper format
     */
    static isValidCode(courseCode) {
        const pattern = /^[A-Z0-9]+-[A-Z0-9]+-?[A-Z0-9]*$/;
        return pattern.test(courseCode);
    }

    /**
     * Get common questions about a code (FAQ style)
     */
    static getCommonQuestions(courseCode) {
        const decoded = decodeCode(courseCode);
        if (decoded.error) return [];

        return [
            {
                question: "What does this code mean?",
                answer: decoded.explanation
            },
            {
                question: "How long will this course take?",
                answer: decoded.duration || "Contact the institution for exact duration"
            },
            {
                question: "Where is this institution located?",
                answer: decoded.universityLocation || "Multiple locations"
            },
            {
                question: "What type of institution is this?",
                answer: decoded.universityType
            }
        ];
    }
}

// ============================================================================
// EXPORT FOR USE IN REACT/VUE COMPONENTS
// ============================================================================

export const courseCodeHelpers = {
    decode: CodeDecoder.getDetailedBreakdown,
    explain: CodeDecoder.getSimpleExplanation,
    format: CodeDecoder.formatCodeVisually,
    getColor: CodeDecoder.getInstitutionColor,
    getCategory: CodeDecoder.getProgramCategory,
    isValid: CodeDecoder.isValidCode,
    getQuestions: CodeDecoder.getCommonQuestions
};

export default CodeDecoder;
