export const APS_GUIDELINES = {
    subjectPoints: {
        "HL": {
            "80-100": 8,
            "70-79": 7,
            "60-69": 6,
            "50-59": 5,
            "40-49": 4,
            "30-39": 3,
            "0-29": 2
        },
        "FAL": {
            "80-100": 7,
            "70-79": 6,
            "60-69": 5,
            "50-59": 4,
            "40-49": 3,
            "30-39": 2,
            "0-29": 1
        },
        "other": {
            "80-100": 8,
            "70-79": 7,
            "60-69": 6,
            "50-59": 5,
            "40-49": 4,
            "30-39": 3,
            "0-29": 2
        }
    },
    
    recommendedSubjects: {
        "Commerce": ["Mathematics", "Accounting", "Business Studies", "Economics"],
        "Science": ["Mathematics", "Physical Science", "Life Sciences"],
        "Engineering": ["Mathematics", "Physical Science"],
        "Health Sciences": ["Mathematics", "Physical Science", "Life Sciences"],
        "Humanities": ["History", "Geography", "Languages"],
        "Law": ["English", "History", "Business Studies"]
    }
};

export function calculateAPSPoints(percentage, level = "other") {
    percentage = Math.max(0, Math.min(100, parseInt(percentage) || 0));
    const pointTable = APS_GUIDELINES.subjectPoints[level] || APS_GUIDELINES.subjectPoints.other;
    
    if (percentage >= 80) return pointTable["80-100"];
    if (percentage >= 70) return pointTable["70-79"];
    if (percentage >= 60) return pointTable["60-69"];
    if (percentage >= 50) return pointTable["50-59"];
    if (percentage >= 40) return pointTable["40-49"];
    if (percentage >= 30) return pointTable["30-39"];
    return pointTable["0-29"];
}

export function getAPSInterpretation(aps) {
    if (aps >= 45) {
        return {
            level: "Outstanding",
            message: "You qualify for the most competitive programmes including Medicine and Engineering at top universities.",
            color: "#16a34a"
        };
    }
    if (aps >= 40) {
        return {
            level: "Excellent",
            message: "You qualify for competitive programmes at traditional universities.",
            color: "#22c55e"
        };
    }
    if (aps >= 35) {
        return {
            level: "Very Good",
            message: "You qualify for most Bachelor's degree programmes.",
            color: "#60a5fa"
        };
    }
    if (aps >= 30) {
        return {
            level: "Good",
            message: "You qualify for many degree programmes.",
            color: "#3b82f6"
        };
    }
    if (aps >= 25) {
        return {
            level: "Fair",
            message: "You qualify for some degrees and most diploma programmes.",
            color: "#f59e0b"
        };
    }
    if (aps >= 20) {
        return {
            level: "Basic",
            message: "Consider diploma programmes at Universities of Technology or TVET colleges.",
            color: "#f97316"
        };
    }
    return {
        level: "Below Average",
        message: "Consider upgrading your marks or exploring bridging programmes.",
        color: "#ef4444"
    };
}

export function getConfidenceLevel(totalAPS, requiredAPS) {
    const difference = totalAPS - requiredAPS;
    if (difference >= 10) return "excellent";
    if (difference >= 5) return "good";
    if (difference >= 0) return "borderline";
    return "low";
}

export function getAdvice(aps, field, missingSubjects = []) {
    let advice = [];
    
    if (aps < 30) {
        advice.push("📚 Consider improving your Mathematics and Science marks.");
        advice.push("🎓 Look at Foundation or Extended programmes at universities.");
    }
    
    if (missingSubjects && missingSubjects.length > 0) {
        advice.push(`📖 For ${field}, consider taking: ${missingSubjects.join(', ')}`);
    }
    
    if (aps >= 40) {
        advice.push("⏰ Apply early! Competitive programmes fill quickly.");
    }
    
    if (aps >= 25 && aps < 35) {
        advice.push("🎯 Focus on subjects that match your intended career path.");
    }
    
    return advice;
}

export default {
    APS_GUIDELINES,
    calculateAPSPoints,
    getAPSInterpretation,
    getConfidenceLevel,
    getAdvice
};
