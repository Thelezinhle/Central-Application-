import React, { useEffect, useState } from 'react';
import { FaUniversity, FaMapMarkerAlt, FaGlobe, FaBook, FaSpinner, FaSearch } from 'react-icons/fa';
import axios from 'axios';

function UniversitiesPage() {
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState('south africa');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProvince, setSelectedProvince] = useState('');

    const countries = [
        'south africa',
        'nigeria',
        'kenya',
        'ghana',
        'ethiopia',
        'uganda',
        'united states',
        'united kingdom',
        'canada',
        'australia',
        'india',
        'germany',
        'france',
        'japan',
        'brazil'
    ];

    const fetchUniversitiesFromAPI = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // If South Africa is selected
            if (selectedCountry.toLowerCase() === 'south africa') {
                // If a province is selected, use the province endpoint
                if (selectedProvince) {
                    const response = await axios.get(`http://localhost:5000/api/universities/province/${selectedProvince}`);
                    setUniversities(response.data.universities || []);
                } else {
                    // Otherwise, get all South African universities from MongoDB
                    const response = await axios.get('http://localhost:5000/api/universities', {
                        params: { country: 'South Africa', limit: 200 }
                    });
                    setUniversities(response.data.universities || []);
                }
            } else {
                // For other countries, use the filtered endpoint
                const response = await axios.get('http://localhost:5000/api/universities/filtered', {
                    params: { country: selectedCountry, limit: 200 }
                });
                setUniversities(response.data.universities || []);
            }
        } catch (error) {
            console.error('Error fetching universities:', error);
            setError('Failed to load universities. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUniversitiesFromAPI();
    }, [selectedCountry, selectedProvince]);

    const filteredUniversities = universities.filter(uni =>
        uni.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                        Browse universities worldwide - {universities.length} institutions available
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Country Selector */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Select Country
                            </label>
                            <select
                                value={selectedCountry}
                                onChange={(e) => {
                                    setSelectedCountry(e.target.value);
                                    setSelectedProvince(''); // Reset province when country changes
                                }}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#228B22] focus:border-transparent"
                            >
                                <option value="">Select a country...</option>
                                {countries.map((country, idx) => (
                                    <option key={idx} value={country}>
                                        {country.charAt(0).toUpperCase() + country.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Province Selector (only for South Africa) */}
                        {selectedCountry.toLowerCase() === 'south africa' && (
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Select Province (Optional)
                                </label>
                                <select
                                    value={selectedProvince}
                                    onChange={(e) => setSelectedProvince(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#228B22] focus:border-transparent"
                                >
                                    <option value="">All Provinces</option>
                                    <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                                    <option value="Western Cape">Western Cape</option>
                                    <option value="Gauteng">Gauteng</option>
                                    <option value="Eastern Cape">Eastern Cape</option>
                                    <option value="Limpopo">Limpopo</option>
                                    <option value="Mpumalanga">Mpumalanga</option>
                                    <option value="Free State">Free State</option>
                                    <option value="Northern Cape">Northern Cape</option>
                                    <option value="North West">North West</option>
                                </select>
                            </div>
                        )}

                        {/* Search */}
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
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#228B22] focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-12">
                        <FaSpinner className="animate-spin text-4xl text-[#228B22] mx-auto mb-4" />
                        <p className="text-lg text-gray-600">Loading universities...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
                        <p className="text-red-800">⚠️ {error}</p>
                    </div>
                )}

                {/* Universities Grid */}
                {!loading && filteredUniversities.length > 0 && (
                    <>
                        <div className="mb-4 text-gray-600">
                            Showing {filteredUniversities.length} of {universities.length} universities
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredUniversities.map((uni) => {
                                // Handle different data structures
                                const city = uni.city || uni.address?.city;
                                const province = uni.address?.province;
                                const website = uni.website || uni.web_pages?.[0];
                                const locationCode = province ? province.substring(0, 2).toUpperCase() : 'ZA';
                                
                                return (
                                    <div
                                        key={uni.id || uni._id}
                                        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border-l-4 border-[#228B22]"
                                    >
                                        <div className="p-6">
                                            {/* University Name */}
                                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                                {uni.name}
                                            </h3>

                                            {/* Location */}
                                            {city && (
                                                <div className="flex items-center gap-2 text-[#8B7355] mb-4">
                                                    <FaMapMarkerAlt className="text-[#8B7355] flex-shrink-0" />
                                                    <span className="font-medium">{city}, {locationCode}</span>
                                                </div>
                                            )}

                                            {/* Website Button */}
                                            {website && (
                                                <div className="flex gap-2 mt-6">
                                                    <a
                                                        href={website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-6 py-2 border-2 border-gray-900 text-gray-900 font-semibold hover:bg-gray-900 hover:text-white transition-colors text-center"
                                                    >
                                                        Visit Website
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}

                {/* Empty State */}
                {!loading && filteredUniversities.length === 0 && universities.length === 0 && (
                    <div className="text-center py-12">
                        <FaUniversity className="text-5xl text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-600 text-lg">
                            No universities found for "{selectedCountry}"
                        </p>
                        <p className="text-gray-500 mt-2">Try selecting a different country</p>
                    </div>
                )}

                {/* No Search Results */}
                {!loading && universities.length > 0 && filteredUniversities.length === 0 && (
                    <div className="text-center py-12">
                        <FaSearch className="text-5xl text-gray-300 mx-auto mb-4" />
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

export default UniversitiesPage;
