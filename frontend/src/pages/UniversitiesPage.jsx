import React, { useEffect, useState } from 'react';
import { FaUniversity, FaExternalLinkAlt, FaSpinner, FaSearch } from 'react-icons/fa';
import axios from 'axios';

function UniversitiesPage() {
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [countries, setCountries] = useState([]);

    // Fetch all universities and group by country
    const fetchUniversities = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await axios.get(
                'http://localhost:5000/api/universities',
                { params: { limit: 500 } }
            );
            
            const unis = response.data.universities || [];

            // Get all global universities
            try {
                const globalResponse = await axios.get(
                    'http://localhost:5000/api/global-universities',
                    { params: { limit: 500 } }
                );
                const allUnis = [...unis, ...(globalResponse.data.universities || [])];
                setUniversities(allUnis);

                // Extract unique countries
                const countryList = [...new Set(allUnis.map(uni => uni.country))].sort();
                setCountries(countryList);
                if (countryList.length > 0 && !selectedCountry) {
                    setSelectedCountry(countryList[0]);
                }
            } catch (e) {
                console.error('Error fetching global universities:', e);
                setUniversities(unis);
                const countryList = [...new Set(unis.map(uni => uni.country))].sort();
                setCountries(countryList);
                if (countryList.length > 0 && !selectedCountry) {
                    setSelectedCountry(countryList[0]);
                }
            }
        } catch (error) {
            console.error('Error fetching universities:', error);
            setError('Failed to load universities. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUniversities();
    }, []);

    // Filter universities by selected country and search query
    const filteredUniversities = universities.filter(uni => {
        const matchesCountry = !selectedCountry || uni.country === selectedCountry;
        const matchesSearch = !searchQuery || 
            uni.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCountry && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#228B22] to-[#1a6b1a] py-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <FaUniversity className="text-4xl text-white" />
                        <h1 className="text-4xl font-bold text-white">Universities</h1>
                    </div>
                    <p className="text-white text-lg">
                        Browse {universities.length} universities worldwide - Click any university to visit their official website
                    </p>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                        {error}
                    </div>
                )}

                {/* Search and Filters */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Search Bar */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <FaSearch className="inline mr-2" />
                                Search Universities
                            </label>
                            <input
                                type="text"
                                placeholder="Type university name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#228B22] focus:border-transparent"
                            />
                        </div>

                        {/* Country Selector */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <FaUniversity className="inline mr-2" />
                                Select Country
                            </label>
                            <select
                                value={selectedCountry || ''}
                                onChange={(e) => setSelectedCountry(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#228B22] focus:border-transparent"
                            >
                                {countries.map((country) => (
                                    <option key={country} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex items-center justify-center py-12">
                        <FaSpinner className="text-4xl text-white animate-spin" />
                        <p className="text-white text-xl ml-4">Loading universities...</p>
                    </div>
                )}

                {/* Universities List */}
                {!loading && (
                    <>
                        {filteredUniversities.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredUniversities.map((uni) => (
                                    <a
                                        key={uni.id}
                                        href={uni.website || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => {
                                            if (!uni.website) {
                                                e.preventDefault();
                                            }
                                        }}
                                        className="block bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-l-4 border-[#228B22] cursor-pointer group"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <FaUniversity className="text-2xl text-[#228B22] flex-shrink-0 group-hover:text-[#1a6b1a]" />
                                            {uni.website && (
                                                <FaExternalLinkAlt className="text-[#228B22] text-sm group-hover:text-[#1a6b1a] transform group-hover:translate-x-1 transition-all" />
                                            )}
                                        </div>

                                        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-[#228B22] transition-colors">
                                            {uni.name}
                                        </h3>

                                        <div className="space-y-2 mb-4 text-sm text-gray-600">
                                            <p>
                                                <span className="font-semibold">Country:</span> {uni.country}
                                            </p>
                                            {uni.type && (
                                                <p>
                                                    <span className="font-semibold">Type:</span> 
                                                    <span className={`ml-2 px-2 py-1 rounded text-white text-xs ${
                                                        uni.type === 'public' ? 'bg-blue-500' : 'bg-purple-500'
                                                    }`}>
                                                        {uni.type.charAt(0).toUpperCase() + uni.type.slice(1)}
                                                    </span>
                                                </p>
                                            )}
                                        </div>

                                        {uni.website ? (
                                            <div className="flex items-center justify-between w-full bg-gradient-to-r from-[#228B22] to-[#1a6b1a] text-white py-2 px-3 rounded-lg font-semibold group-hover:shadow-lg transition-all">
                                                <span>Visit Website</span>
                                                <FaExternalLinkAlt className="text-sm transform group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        ) : (
                                            <div className="w-full bg-gray-300 text-gray-600 py-2 px-3 rounded-lg text-center font-semibold cursor-not-allowed">
                                                No Website Available
                                            </div>
                                        )}
                                    </a>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <FaUniversity className="text-6xl text-white opacity-30 mx-auto mb-4" />
                                <p className="text-white text-xl">
                                    {searchQuery ? 'No universities found matching your search.' : 'No universities available for this country.'}
                                </p>
                            </div>
                        )}

                        {/* Results Count */}
                        <div className="mt-8 text-center text-white">
                            <p className="text-lg">
                                Showing {filteredUniversities.length} of {universities.length} universities
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default UniversitiesPage;
