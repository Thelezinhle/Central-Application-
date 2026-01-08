import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { FaUniversity, FaGlobe, FaMapMarkerAlt, FaBook } from 'react-icons/fa';
import axios from 'axios';
import { useVoiceNarration } from '../hooks/useVoiceNarration';

function UniversitiesListPage() {
    const { speak, voiceEnabled } = useVoiceNarration();
    const [selectedCountry, setSelectedCountry] = useState('south africa');
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch universities
    const { data, isLoading, error, refetch } = useQuery(
        ['filteredUniversities', selectedCountry],
        async () => {
            const response = await axios.get('http://localhost:5000/api/universities/filtered', {
                params: { country: selectedCountry, limit: 200 }
            });
            return response.data;
        },
        { staleTime: 1000 * 60 * 10 } // Cache for 10 minutes
    );

    // Announce on load
    useEffect(() => {
        if (voiceEnabled && data?.count) {
            speak(`Found ${data.count} universities in ${selectedCountry}`);
        }
    }, [data?.count, selectedCountry, voiceEnabled, speak]);

    // Filter universities based on search
    const filteredUniversities = (data?.universities || []).filter(uni =>
        uni.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCountryChange = (e) => {
        const country = e.target.value;
        setSelectedCountry(country);
        if (voiceEnabled) {
            speak(`Loading universities in ${country}`);
        }
    };

    const handleUniversityClick = (uni) => {
        if (voiceEnabled) {
            speak(`${uni.name}, located in ${uni.city || 'unknown location'}`);
        }
    };

    return (
        <div className="min-h-screen bg-[#228B22] py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <FaUniversity className="text-3xl text-white" />
                        <h1 className="text-4xl font-bold text-white">Universities</h1>
                    </div>
                    <p className="text-white text-lg">
                        Browse universities worldwide - {data?.count || 0} institutions available
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Country Selector */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Select Country
                            </label>
                            <select
                                value={selectedCountry}
                                onChange={handleCountryChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#228B22] focus:border-transparent"
                            >
                                <option value="south africa">South Africa</option>
                                <option value="nigeria">Nigeria</option>
                                <option value="kenya">Kenya</option>
                                <option value="ghana">Ghana</option>
                                <option value="ethiopia">Ethiopia</option>
                                <option value="united states">United States</option>
                                <option value="united kingdom">United Kingdom</option>
                                <option value="canada">Canada</option>
                                <option value="australia">Australia</option>
                                <option value="india">India</option>
                            </select>
                        </div>

                        {/* Search */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Search Universities
                            </label>
                            <input
                                type="text"
                                placeholder="Type university name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#228B22] focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="text-center py-12">
                        <div className="inline-block">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#228B22]"></div>
                        </div>
                        <p className="mt-4 text-gray-600">Loading universities...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
                        <p className="text-red-800">
                            ⚠️ Error loading universities: {error.message}
                        </p>
                    </div>
                )}

                {/* Universities Grid */}
                {!isLoading && filteredUniversities.length > 0 && (
                    <>
                        <div className="mb-4 text-gray-600">
                            Showing {filteredUniversities.length} of {data?.count} universities
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredUniversities.map((uni) => (
                                <div
                                    key={uni.id}
                                    onClick={() => handleUniversityClick(uni)}
                                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden border-l-4 border-[#228B22]"
                                >
                                    <div className="p-6">
                                        {/* University Name */}
                                        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start gap-2">
                                            <FaUniversity className="text-[#228B22] flex-shrink-0 mt-1" />
                                            <span>{uni.name}</span>
                                        </h3>

                                        {/* Location */}
                                        {uni.city && (
                                            <div className="flex items-center gap-2 text-gray-600 mb-2">
                                                <FaMapMarkerAlt className="text-[#228B22]" />
                                                <span>{uni.city}, {uni.country}</span>
                                            </div>
                                        )}

                                        {/* Website */}
                                        {uni.website && (
                                            <div className="flex items-center gap-2 mb-3">
                                                <FaGlobe className="text-[#228B22]" />
                                                <a
                                                    href={uni.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[#228B22] hover:underline truncate text-sm"
                                                >
                                                    Visit Website
                                                </a>
                                            </div>
                                        )}

                                        {/* Founded Year */}
                                        {uni.established && (
                                            <div className="flex items-center gap-2 text-gray-600 text-sm">
                                                <FaBook className="text-[#228B22]" />
                                                <span>Founded: {uni.established}</span>
                                            </div>
                                        )}

                                        {/* Ranking */}
                                        {uni.ranking && (
                                            <div className="mt-3 pt-3 border-t border-gray-200">
                                                <span className="inline-block bg-[#228B22] text-white px-3 py-1 rounded-full text-xs font-semibold">
                                                    {uni.ranking.toLocaleString()} citations
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* Empty State */}
                {!isLoading && filteredUniversities.length === 0 && data?.count === 0 && (
                    <div className="text-center py-12">
                        <FaUniversity className="text-5xl text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-600 text-lg">
                            No universities found for "{selectedCountry}"
                        </p>
                        <p className="text-gray-500 mt-2">Try selecting a different country</p>
                    </div>
                )}

                {/* No Search Results */}
                {!isLoading && data?.count > 0 && filteredUniversities.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">
                            No universities match "{searchQuery}"
                        </p>
                        <button
                            onClick={() => setSearchQuery('')}
                            className="mt-4 px-4 py-2 bg-[#228B22] text-white rounded-lg hover:bg-[#1a6b1a] transition"
                        >
                            Clear Search
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UniversitiesListPage;
