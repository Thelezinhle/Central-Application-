import React, { useState, useEffect } from 'react';
import { FaCalculator, FaPlus, FaTrash, FaArrowRight, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { announceToScreenReader } from '../utils/accessibility';

// APS Conversion Table (South African Standard)
const APS_CONVERSION = {
  'HL': [ // Home Language
    { min: 0, max: 19, points: 0 },
    { min: 20, max: 29, points: 1 },
    { min: 30, max: 39, points: 2 },
    { min: 40, max: 49, points: 3 },
    { min: 50, max: 59, points: 4 },
    { min: 60, max: 69, points: 5 },
    { min: 70, max: 79, points: 6 },
    { min: 80, max: 100, points: 7 }
  ],
  'SL': [ // First Additional Language / Other subjects
    { min: 0, max: 19, points: 0 },
    { min: 20, max: 29, points: 1 },
    { min: 30, max: 39, points: 2 },
    { min: 40, max: 49, points: 3 },
    { min: 50, max: 59, points: 4 },
    { min: 60, max: 69, points: 5 },
    { min: 70, max: 79, points: 6 },
    { min: 80, max: 100, points: 7 }
  ]
};

const AVAILABLE_SUBJECTS = [
  'Mathematics',
  'Mathematical Literacy',
  'English Home Language',
  'English First Additional Language',
  'Afrikaans Home Language',
  'Afrikaans First Additional Language',
  'Physics',
  'Chemistry',
  'Biology',
  'Life Sciences',
  'Accounting',
  'Economics',
  'Business Studies',
  'Geography',
  'History',
  'Computer Applications Technology',
  'Information Technology',
  'Design'
];

function APSCalculatorV2() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([
    { name: 'Mathematics', percentage: '', level: 'HL' },
    { name: 'English Home Language', percentage: '', level: 'HL' },
    { name: '', percentage: '', level: 'SL' }
  ]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [matchingCourses, setMatchingCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [showCourseBreakdown, setShowCourseBreakdown] = useState(false);

  // Convert percentage to APS points
  const getAPSPoints = (percentage, level) => {
    const conversionTable = APS_CONVERSION[level] || APS_CONVERSION['SL'];
    const percentageNum = parseInt(percentage);
    const entry = conversionTable.find(e => percentageNum >= e.min && percentageNum <= e.max);
    return entry ? entry.points : 0;
  };

  // Calculate total APS
  const calculateAPS = () => {
    const validSubjects = subjects.filter(s => s.name && s.percentage);

    if (validSubjects.length === 0) {
      announceToScreenReader('Please add at least one subject with a percentage', 'assertive');
      return;
    }

    let totalAPS = 0;
    const subjectDetails = [];

    validSubjects.forEach(subject => {
      const points = getAPSPoints(subject.percentage, subject.level);
      totalAPS += points;
      subjectDetails.push({
        subject: subject.name,
        percentage: subject.percentage,
        level: subject.level,
        points: points
      });
    });

    // Determine APS interpretation
    let interpretation = '';
    if (totalAPS <= 20) {
      interpretation = 'Below average - Consider alternative qualifications';
    } else if (totalAPS <= 30) {
      interpretation = 'Average - Many courses available';
    } else if (totalAPS <= 40) {
      interpretation = 'Good - Wide range of courses available';
    } else if (totalAPS <= 50) {
      interpretation = 'Excellent - Most universities open to you';
    } else {
      interpretation = 'Outstanding - Access to top-tier courses';
    }

    const resultData = {
      totalAPS,
      interpretation,
      subjectDetails,
      numSubjects: validSubjects.length
    };

    setResult(resultData);
    announceToScreenReader(`Your APS score is ${totalAPS}. ${interpretation}`, 'polite');
    
    // Fetch matching courses
    fetchMatchingCourses(totalAPS);
  };

  const fetchMatchingCourses = async (apsScore) => {
    try {
      setLoadingCourses(true);
      const response = await axios.get('http://localhost:5000/api/browse-courses', {
        params: {
          maxAPS: apsScore
        }
      });

      if (response.data.success) {
        // Filter to only courses where user APS >= minimum required
        const matching = response.data.data.filter(course => apsScore >= course.minAPS);
        setMatchingCourses(matching);
        announceToScreenReader(`Found ${matching.length} courses you can apply for`, 'polite');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      announceToScreenReader('Unable to load matching courses. Please try again.', 'assertive');
    } finally {
      setLoadingCourses(false);
    }
  };

  const addSubject = () => {
    setSubjects([...subjects, { name: '', percentage: '', level: 'SL' }]);
  };

  const removeSubject = (index) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter((_, i) => i !== index));
    }
  };

  const updateSubject = (index, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;
    setSubjects(newSubjects);
  };

  const handleApplyToMatching = () => {
    if (matchingCourses.length === 0) {
      announceToScreenReader('No matching courses available for your APS score', 'assertive');
      return;
    }
    
    // Navigate to courses page with filter for matching courses
    navigate('/courses');
    announceToScreenReader(`Navigating to courses page with ${matchingCourses.length} matching courses`, 'polite');
  };

  const handleSaveAPS = () => {
    if (result) {
      localStorage.setItem('studentAPS', JSON.stringify({
        score: result.totalAPS,
        subjects: result.subjectDetails,
        calculatedAt: new Date().toISOString()
      }));
      announceToScreenReader('Your APS score has been saved to your profile', 'polite');
    }
  };

  return (
    <div className="min-h-screen bg-[#228B22] py-12">
      <div className="max-w-5xl mx-auto px-4" role="main" aria-label="APS Calculator - Calculate your admission points score">
        
        {/* Header */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 bg-white hover:bg-gray-100 text-[#228B22] px-3 py-2 rounded transition font-semibold"
          aria-label="Go to previous page"
        >
          <FaArrowLeft aria-hidden="true" /> Back
        </button>

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <FaCalculator className="text-4xl text-white" aria-hidden="true" />
            <h1 className="text-4xl font-bold text-white">APS Calculator</h1>
          </div>
          <p className="text-gray-100 text-lg">
            Calculate your Admission Points Score based on your Grade 12 results and discover which South African university courses you qualify for.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Calculator */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-[#228B22] mb-6">Enter Your Subjects</h2>

              {/* Subject Inputs */}
              <div className="space-y-5 mb-8">
                {subjects.map((subject, index) => (
                  <div key={index} className="flex gap-3 items-end p-4 bg-gray-50 rounded-lg border border-gray-200">
                    {/* Subject Dropdown */}
                    <div className="flex-1">
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Subject
                      </label>
                      <select
                        value={subject.name}
                        onChange={(e) => updateSubject(index, 'name', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#228B22]"
                        aria-label={`Subject ${index + 1}`}
                      >
                        <option value="">Select subject...</option>
                        {AVAILABLE_SUBJECTS.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    {/* Percentage */}
                    <div className="w-28">
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Percentage
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        placeholder="0-100"
                        value={subject.percentage}
                        onChange={(e) => updateSubject(index, 'percentage', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#228B22]"
                        aria-label={`${subject.name || 'Subject'} percentage`}
                      />
                    </div>

                    {/* Level */}
                    <div className="w-32">
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Level
                      </label>
                      <select
                        value={subject.level}
                        onChange={(e) => updateSubject(index, 'level', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#228B22]"
                        aria-label={`${subject.name || 'Subject'} level`}
                      >
                        <option value="HL">Home Language</option>
                        <option value="SL">Other</option>
                      </select>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => removeSubject(index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Remove subject"
                      aria-label={`Remove ${subject.name || 'subject'}`}
                    >
                      <FaTrash aria-hidden="true" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={addSubject}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-semibold"
                  aria-label="Add another subject"
                >
                  <FaPlus aria-hidden="true" /> Add Subject
                </button>
                <button
                  onClick={calculateAPS}
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#228B22] text-white rounded-lg hover:bg-[#1a6b1a] transition disabled:bg-gray-400 font-bold text-lg"
                  aria-label="Calculate my APS score"
                >
                  <FaCalculator aria-hidden="true" />
                  {loading ? 'Calculating...' : 'Calculate APS'}
                </button>
              </div>

              {/* Info Box */}
              <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
                <p className="text-sm text-blue-900">
                  <strong>💡 Tip:</strong> Enter at least 6 subjects for an accurate APS score. Home Language subjects are weighted the same as other subjects in the APS calculation.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Reference */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-20">
              <h3 className="text-lg font-bold text-[#228B22] mb-4">APS Conversion Guide</h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-semibold">Percentage</span>
                  <span className="font-semibold">Points</span>
                </div>
                <div className="flex justify-between">
                  <span>0-19%</span>
                  <span className="font-bold text-red-600">0</span>
                </div>
                <div className="flex justify-between">
                  <span>20-29%</span>
                  <span className="font-bold text-red-600">1</span>
                </div>
                <div className="flex justify-between">
                  <span>30-39%</span>
                  <span className="font-bold text-orange-600">2</span>
                </div>
                <div className="flex justify-between">
                  <span>40-49%</span>
                  <span className="font-bold text-yellow-600">3</span>
                </div>
                <div className="flex justify-between">
                  <span>50-59%</span>
                  <span className="font-bold text-green-600">4</span>
                </div>
                <div className="flex justify-between">
                  <span>60-69%</span>
                  <span className="font-bold text-green-700">5</span>
                </div>
                <div className="flex justify-between">
                  <span>70-79%</span>
                  <span className="font-bold text-[#228B22]">6</span>
                </div>
                <div className="flex justify-between">
                  <span>80-100%</span>
                  <span className="font-bold text-[#228B22]">7</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <p className="text-xs text-gray-600">
                  <strong>Note:</strong> Total APS is the sum of all subject points. Most universities require APS 25-40.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="mt-12">
            {/* Big Score Display */}
            <div className="bg-gradient-to-r from-[#228B22] to-[#1a6b1a] rounded-lg shadow-2xl p-8 mb-8 text-white">
              <div className="text-center mb-6">
                <p className="text-lg opacity-90 mb-2">Your APS Score</p>
                <div className="text-7xl font-bold mb-4">{result.totalAPS}</div>
                <p className="text-2xl font-semibold">{result.interpretation}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-white">
                <div>
                  <p className="text-sm opacity-75">Subjects</p>
                  <p className="text-2xl font-bold">{result.numSubjects}</p>
                </div>
                <div>
                  <p className="text-sm opacity-75">Avg per Subject</p>
                  <p className="text-2xl font-bold">{(result.totalAPS / result.numSubjects).toFixed(1)}</p>
                </div>
                <div>
                  <p className="text-sm opacity-75">Matching Courses</p>
                  <p className="text-2xl font-bold">{matchingCourses.length}</p>
                </div>
                <div>
                  <p className="text-sm opacity-75">Percentile</p>
                  <p className="text-2xl font-bold">{result.totalAPS >= 40 ? 'Top' : result.totalAPS >= 30 ? 'Mid' : 'Lower'}+</p>
                </div>
              </div>
            </div>

            {/* Subject Breakdown */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-bold text-[#228B22] mb-6">Your Subject Scores</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.subjectDetails.map((subject, index) => (
                  <div key={index} className="bg-gray-50 p-5 rounded-lg border-l-4 border-[#228B22]">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-gray-900 text-lg">{subject.subject}</p>
                        <p className="text-sm text-gray-600">{subject.percentage}% · {subject.level === 'HL' ? 'Home Language' : 'Other'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-4xl font-bold text-[#228B22]">{subject.points}</p>
                        <p className="text-xs text-gray-500">points</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Matching Courses */}
            {loadingCourses ? (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <p className="text-gray-600">Loading matching courses...</p>
              </div>
            ) : matchingCourses.length > 0 ? (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-[#228B22]">Courses You Can Apply For</h3>
                    <p className="text-gray-600 text-lg">{matchingCourses.length} courses match your APS score of {result.totalAPS}</p>
                  </div>
                  <FaCheckCircle className="text-5xl text-green-500" aria-hidden="true" />
                </div>

                {/* Course Preview (First 5) */}
                <div className="space-y-3 mb-6">
                  {matchingCourses.slice(0, 5).map((course, index) => (
                    <div key={index} className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-gray-900">{course.name}</p>
                          <p className="text-sm text-gray-600">{course.faculty} · {course.durationYears} years</p>
                        </div>
                        <div className="text-right text-sm">
                          <p className="font-semibold text-[#228B22]">Min APS: {course.minAPS}</p>
                          <p className={`text-xs ${result.totalAPS - course.minAPS >= 5 ? 'text-green-600' : 'text-gray-600'}`}>
                            {result.totalAPS - course.minAPS >= 0 ? '✓ You qualify!' : 'Just short'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {matchingCourses.length > 5 && (
                    <p className="text-center text-gray-600 py-2">
                      ... and {matchingCourses.length - 5} more courses
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleApplyToMatching}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#228B22] text-white rounded-lg hover:bg-[#1a6b1a] transition font-bold text-lg"
                    aria-label={`View all ${matchingCourses.length} matching courses`}
                  >
                    View All {matchingCourses.length} Courses <FaArrowRight aria-hidden="true" />
                  </button>
                  <button
                    onClick={handleSaveAPS}
                    className="flex-1 px-6 py-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-bold"
                    aria-label="Save my APS score to profile"
                  >
                    Save to Profile
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <p className="text-gray-600 text-lg mb-4">
                  No courses currently match your APS score of {result.totalAPS}.
                </p>
                <p className="text-gray-500 mb-4">
                  Our database is growing! Check back soon or explore all available courses.
                </p>
                <button
                  onClick={() => navigate('/courses')}
                  className="px-6 py-3 bg-[#228B22] text-white rounded-lg hover:bg-[#1a6b1a] transition font-semibold"
                >
                  Browse All Courses
                </button>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        {!result && (
          <div className="mt-12 bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-gray-600 text-lg mb-4">
              Ready to discover your course options? Enter your subjects above to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default APSCalculatorV2;
