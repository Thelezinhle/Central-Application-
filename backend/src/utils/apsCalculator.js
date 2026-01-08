// APS Calculator utility
export function calculateAPSScore(subjects) {
    /**
     * subjects: Array of { name: string, percentage: number, level: 'HL'|'SL' }
     * Returns: { totalAPS: number, subjectDetails: array, interpretation: string }
     */

    const pointsTable = {
        'HL': { // Home Language points
            90: 8, 80: 7, 70: 6, 60: 5, 50: 4, 40: 3, 30: 2, 0: 1
        },
        'SL': { // First Additional Language points
            90: 7, 80: 6, 70: 5, 60: 4, 50: 3, 40: 2, 30: 1, 0: 0
        },
        'other': { // Other subjects
            90: 8, 80: 7, 70: 6, 60: 5, 50: 4, 40: 3, 30: 2, 0: 1
        }
    };

    let totalAPS = 0;
    const subjectDetails = subjects.map(subject => {
        const percentage = Math.max(0, Math.min(100, subject.percentage));
        const level = subject.level || 'other';

        // Get points based on percentage
        let points = 0;
        if (percentage >= 90) points = pointsTable[level][90];
        else if (percentage >= 80) points = pointsTable[level][80];
        else if (percentage >= 70) points = pointsTable[level][70];
        else if (percentage >= 60) points = pointsTable[level][60];
        else if (percentage >= 50) points = pointsTable[level][50];
        else if (percentage >= 40) points = pointsTable[level][40];
        else if (percentage >= 30) points = pointsTable[level][30];
        else points = pointsTable[level][0];

        totalAPS += points;

        return {
            subject: subject.name,
            percentage,
            level,
            points
        };
    });

    // Get interpretation
    const interpretation = getAPSInterpretation(totalAPS);

    return {
        totalAPS,
        subjectDetails,
        interpretation,
        possibleCourses: getPossibleCourses(totalAPS)
    };
}

export function getAPSInterpretation(aps) {
    if (aps >= 42) return "Excellent! You qualify for Medicine, Engineering and other competitive courses.";
    if (aps >= 38) return "Very Good! You qualify for most Bachelor's degree programmes.";
    if (aps >= 34) return "Good! You qualify for many degree programmes.";
    if (aps >= 28) return "Fair. You qualify for some degrees and most diploma programmes.";
    return "Consider diploma programmes or improving your marks.";
}

// Import courses data
import { searchCourses } from './coursesData.js';

export function getPossibleCourses(totalAPS) {
    // Search for all courses matching this APS
    const allCourses = searchCourses('', { minAPS: totalAPS });

    return allCourses
        .sort((a, b) => b.minAPS - a.minAPS) // Show highest requirements first
        .slice(0, 10) // Limit to 10 suggestions
        .map(course => ({
            id: course.id,
            name: course.name,
            university: course.university,
            minAPS: course.minAPS,
            matchLevel: ((totalAPS - course.minAPS) / course.minAPS * 100).toFixed(1) + '% above minimum'
        }));
}
