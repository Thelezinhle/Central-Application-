import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CollegeCard from '../components/CollegeCard';
import CollegeDetailModal from '../components/CollegeDetailModal';
import CollegeComparisonModal from '../components/CollegeComparisonModal';
import { Bookmark } from 'lucide-react';

function CollegesPage() {
    const [colleges, setColleges] = useState([]);
    const [filteredColleges, setFilteredColleges] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [country, setCountry] = useState('South Africa');
    const [category, setCategory] = useState('');
    const [minAPS, setMinAPS] = useState('');
    
    // Modal states
    const [selectedCollege, setSelectedCollege] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isComparisonOpen, setIsComparisonOpen] = useState(false);
    const [comparisonColleges, setComparisonColleges] = useState([]);
    
    // Favorites from localStorage
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favoriteColleges');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        fetchColleges();
    }, [country, category]);

    useEffect(() => {
        filterColleges();
    }, [colleges, search, minAPS]);

    useEffect(() => {
        localStorage.setItem('favoriteColleges', JSON.stringify(favorites));
    }, [favorites]);

    const fetchColleges = async () => {
        try {
            setLoading(true);
            setError(null);
            
            let url = 'http://localhost:5000/api/colleges';
            const params = [];
            
            if (country && country.toLowerCase() === 'south africa') {
                url = 'http://localhost:5000/api/colleges/south-africa/all';
            } else if (country) {
                params.push(`country=${encodeURIComponent(country)}`);
            }
            
            if (category) {
                params.push(`category=${encodeURIComponent(category)}`);
            }
            
            const query = params.length > 0 ? `?${params.join('&')}` : '';
            const response = await axios.get(url + query);
            setColleges(response.data.colleges || []);
            setFilteredColleges(response.data.colleges || []);
        } catch (err) {
            console.error('Error fetching colleges:', err);
            setError('Failed to load colleges. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const filterColleges = () => {
        let filtered = [...colleges];
        
        // Search filter
        if (search) {
            filtered = filtered.filter(college =>
                college.name.toLowerCase().includes(search.toLowerCase()) ||
                college.location?.toLowerCase().includes(search.toLowerCase()) ||
                college.type?.toLowerCase().includes(search.toLowerCase())
            );
        }
        
        // APS filter
        if (minAPS) {
            const apsValue = parseInt(minAPS);
            // Filter colleges that have courses matching the APS requirement
            filtered = filtered.filter(college => {
                // For now, we'll show colleges with lower requirements
                return true; // Simplified - full implementation would check course APS
            });
        }
        
        setFilteredColleges(filtered);
    };

    const handleClearFilters = () => {
        setSearch('');
        setCountry('South Africa');
        setCategory('');
        setMinAPS('');
    };

    const handleViewDetails = (college) => {
        setSelectedCollege(college);
        setIsDetailOpen(true);
    };

    const handleAddToComparison = (college) => {
        if (comparisonColleges.find(c => c.id === college.id)) {
            setComparisonColleges(comparisonColleges.filter(c => c.id !== college.id));
        } else {
            setComparisonColleges([...comparisonColleges, college]);
        }
    };

    const handleToggleFavorite = (college) => {
        if (favorites.find(c => c.id === college.id)) {
            setFavorites(favorites.filter(c => c.id !== college.id));
        } else {
            setFavorites([...favorites, college]);
        }
    };

    const isFavorite = (collegeId) => {
        return favorites.some(c => c.id === collegeId);
    };

    return (
        <div className="min-h-screen bg-[#228B22] py-12">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8 flex justify-between items-start">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Find Colleges</h1>
                        <p className="text-xl text-white">
                            Browse colleges and TVET institutions in South Africa and worldwide
                        </p>
                    </div>
                    {favorites.length > 0 && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2">
                            <Bookmark fill="currentColor" className="text-red-600" size={24} />
                            <div>
                                <p className="text-sm text-gray-600">Bookmarked</p>
                                <p className="text-2xl font-bold text-red-600">{favorites.length}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Search college name..."
                            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <select
                            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        >
                            <option value="South Africa">South Africa</option>
                            <option value="USA">USA</option>
                            <option value="UK">UK</option>
                            <option value="Canada">Canada</option>
                            <option value="Australia">Australia</option>
                            <option value="Kenya">Kenya</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="">All Countries</option>
                        </select>
                        <select
                            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">All Types</option>
                            <option value="private">Private Colleges</option>
                            <option value="tvet">TVET Colleges</option>
                            <option value="international">International</option>
                            <option value="african">African Universities</option>
                        </select>
                        <select
                            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={minAPS}
                            onChange={(e) => setMinAPS(e.target.value)}
                        >
                            <option value="">Min APS Score</option>
                            <option value="15">15+</option>
                            <option value="20">20+</option>
                            <option value="25">25+</option>
                            <option value="30">30+</option>
                            <option value="35">35+</option>
                            <option value="40">40+</option>
                        </select>
                        <button
                            onClick={handleClearFilters}
                            className="bg-gray-200 text-gray-800 rounded-lg p-3 hover:bg-gray-300 transition-colors font-medium"
                        >
                            Clear All
                        </button>
                    </div>

                    {/* Quick Filter Buttons */}
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => { setCountry('South Africa'); setCategory(''); }}
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm hover:bg-blue-200 transition-colors"
                        >
                            South Africa
                        </button>
                        <button
                            onClick={() => { setCategory('private'); setSearch(''); }}
                            className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm hover:bg-green-200 transition-colors"
                        >
                            Private Colleges
                        </button>
                        <button
                            onClick={() => { setCategory('tvet'); setSearch(''); }}
                            className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded text-sm hover:bg-yellow-200 transition-colors"
                        >
                            TVET Colleges
                        </button>
                        <button
                            onClick={() => { setCountry(''); setCategory('international'); setSearch(''); }}
                            className="bg-purple-100 text-purple-800 px-3 py-1 rounded text-sm hover:bg-purple-200 transition-colors"
                        >
                            International
                        </button>
                        <button
                            onClick={() => {
                                handleClearFilters();
                                setFilteredColleges(favorites);
                            }}
                            className="bg-red-100 text-red-800 px-3 py-1 rounded text-sm hover:bg-red-200 transition-colors flex items-center gap-1"
                        >
                            <Bookmark size={16} fill="currentColor" />
                            My Bookmarks ({favorites.length})
                        </button>
                    </div>

                    {/* Comparison Section */}
                    {comparisonColleges.length > 0 && (
                        <div className="mt-4 pt-4 border-t flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-700">Comparing {comparisonColleges.length} colleges</span>
                                <div className="flex gap-2">
                                    {comparisonColleges.map((col) => (
                                        <span key={col.id} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                            {col.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <button
                                onClick={() => setIsComparisonOpen(true)}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-medium"
                            >
                                View Comparison
                            </button>
                        </div>
                    )}
                </div>

                {/* Results */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                        <p className="mt-4 text-gray-600">Loading colleges...</p>
                    </div>
                ) : filteredColleges.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No colleges found. Try different search criteria.</p>
                    </div>
                ) : (
                    <>
                        <div className="mb-4 text-gray-600 font-medium">
                            Found {filteredColleges.length} colleges
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredColleges.map((college, index) => (
                                <CollegeCard 
                                    key={college.id || index} 
                                    college={college}
                                    onViewDetails={handleViewDetails}
                                    isFavorite={isFavorite(college.id)}
                                    onToggleFavorite={handleToggleFavorite}
                                    onCompare={handleAddToComparison}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Modals */}
            <CollegeDetailModal
                college={selectedCollege}
                isOpen={isDetailOpen}
                onClose={() => setIsDetailOpen(false)}
                isFavorite={selectedCollege && isFavorite(selectedCollege.id)}
                onToggleFavorite={handleToggleFavorite}
            />

            <CollegeComparisonModal
                colleges={comparisonColleges}
                isOpen={isComparisonOpen}
                onClose={() => setIsComparisonOpen(false)}
            />
        </div>
    );
}

export default CollegesPage;
