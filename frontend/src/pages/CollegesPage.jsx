import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CollegeCard from '../components/CollegeCard';
import CollegeDetailModal from '../components/CollegeDetailModal';
import CollegeComparisonModal from '../components/CollegeComparisonModal';
import { Bookmark, ExternalLink } from 'lucide-react';

function CollegesPage() {
    const [colleges, setColleges] = useState([]);
    const [filteredColleges, setFilteredColleges] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [country, setCountry] = useState('South Africa');
    const [category, setCategory] = useState('');
    const [minAPS, setMinAPS] = useState('');
    const [displayMode, setDisplayMode] = useState('cards'); // 'cards' or 'list'
    
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
    
    // Available countries from colleges data
    const [availableCountries, setAvailableCountries] = useState([]);

    useEffect(() => {
        fetchAllColleges();
    }, []);

    useEffect(() => {
        if (colleges.length > 0) {
            const countries = [...new Set(colleges.map(c => c.country))].sort();
            setAvailableCountries(countries);
        }
    }, [colleges]);

    useEffect(() => {
        filterColleges();
    }, [colleges, search, minAPS, country, category]);

    useEffect(() => {
        localStorage.setItem('favoriteColleges', JSON.stringify(favorites));
    }, [favorites]);

    const fetchAllColleges = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await axios.get('http://localhost:5000/api/colleges');
            setColleges(response.data.colleges || []);
            setFilteredColleges(response.data.colleges || []);
        } catch (err) {
            console.error('Error fetching colleges:', err);
            setError('Failed to load colleges. Please try again.');
            setColleges([]);
            setFilteredColleges([]);
        } finally {
            setLoading(false);
        }
    };

    const filterColleges = () => {
        let filtered = [...colleges];
        
        // Country filter
        if (country) {
            filtered = filtered.filter(college =>
                college.country?.toLowerCase() === country.toLowerCase()
            );
        }
        
        // Category filter
        if (category) {
            filtered = filtered.filter(college =>
                college.category?.toLowerCase() === category.toLowerCase()
            );
        }
        
        // Search filter
        if (search) {
            filtered = filtered.filter(college =>
                college.name.toLowerCase().includes(search.toLowerCase()) ||
                college.location?.toLowerCase().includes(search.toLowerCase()) ||
                college.type?.toLowerCase().includes(search.toLowerCase())
            );
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
                            Browse colleges and TVET institutions worldwide
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
                            <option value="">All Countries</option>
                            {availableCountries.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                        <select
                            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">All Types</option>
                            <option value="public">Public Colleges</option>
                            <option value="private">Private Colleges</option>
                            <option value="international">International</option>
                            <option value="african">African Colleges</option>
                        </select>
                        <select
                            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={displayMode}
                            onChange={(e) => setDisplayMode(e.target.value)}
                        >
                            <option value="cards">Card View</option>
                            <option value="list">List View</option>
                        </select>
                        <button
                            onClick={handleClearFilters}
                            className="bg-gray-200 text-gray-800 rounded-lg p-3 hover:bg-gray-300 transition-colors font-medium"
                        >
                            Clear All
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
                ) : displayMode === 'cards' ? (
                    <>
                        <div className="mb-4 text-white font-medium">
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
                ) : (
                    // List View - Clickable rows with website links
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="mb-4 p-4 bg-gray-50 font-medium text-gray-700">
                            Found {filteredColleges.length} colleges
                        </div>
                        <div className="divide-y">
                            {filteredColleges.map((college) => (
                                <a
                                    key={college.id}
                                    href={college.website || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => {
                                        if (!college.website) {
                                            e.preventDefault();
                                        }
                                    }}
                                    className="flex items-center justify-between p-4 hover:bg-blue-50 transition-colors group"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                                                {college.name}
                                            </h3>
                                            {college.website && (
                                                <ExternalLink size={18} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                                            )}
                                        </div>
                                        <div className="text-sm text-gray-600 mt-1">
                                            {college.location}
                                        </div>
                                        <div className="flex gap-2 mt-2">
                                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                                {college.country}
                                            </span>
                                            <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                                {college.type}
                                            </span>
                                            {college.category && (
                                                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                                    {college.category}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 ml-4">
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleToggleFavorite(college);
                                            }}
                                            className={`p-2 rounded ${isFavorite(college.id) ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                        >
                                            <Bookmark size={18} fill={isFavorite(college.id) ? 'currentColor' : 'none'} />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleAddToComparison(college);
                                            }}
                                            className={`p-2 rounded ${comparisonColleges.find(c => c.id === college.id) ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                        >
                                            +
                                        </button>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
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
