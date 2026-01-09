import React, { useState, useEffect } from 'react';
import { FaUniversity, FaGraduationCap, FaFilter, FaSearch, FaExternalLinkAlt, FaBook } from 'react-icons/fa';
import axios from 'axios';
import BeginnerGuide from '../components/BeginnerGuide';

function AllInstitutionsPage() {
    const [institutions, setInstitutions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('all');
    const [selectedProvince, setSelectedProvince] = useState('all');
    const [filteredInstitutions, setFilteredInstitutions] = useState([]);

    const API_URL = 'http://localhost:5000/api';

    useEffect(() => {
        fetchInstitutions();
    }, []);

    const fetchInstitutions = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/universities`);
            setInstitutions(response.data.universities || []);
        } catch (error) {
            console.error('Error fetching institutions:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        filterInstitutions();
    }, [institutions, searchTerm, selectedType, selectedProvince]);

    const filterInstitutions = () => {
        let filtered = institutions;

        // Filter by type
        if (selectedType !== 'all') {
            filtered = filtered.filter(inst => inst.type === selectedType);
        }

        // Filter by province
        if (selectedProvince !== 'all') {
            filtered = filtered.filter(inst => inst.address?.province === selectedProvince);
        }

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(inst =>
                inst.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                inst.code?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredInstitutions(filtered);
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'public_university':
                return <FaUniversity className="text-blue-600" />;
            case 'tvet_college':
                return <FaGraduationCap className="text-orange-600" />;
            case 'cao_partner_college':
                return <FaBook className="text-green-600" />;
            case 'private_college':
                return <FaGraduationCap className="text-purple-600" />;
            default:
                return <FaUniversity className="text-gray-600" />;
        }
    };

    const getTypeLabel = (type) => {
        const labels = {
            'public_university': '🎓 University',
            'tvet_college': '🔧 Training College',
            'cao_partner_college': '🏫 College (CAO)',
            'private_college': '💼 Private College'
        };
        return labels[type] || type;
    };

    const getApplicationLabel = (appSystem) => {
        const labels = {
            'CAO': '✓ CAO System',
            'direct_college': '→ Direct Application',
            'direct_university': '→ Direct Application'
        };
        return labels[appSystem] || appSystem;
    };

    const getApplicationLink = (institution) => {
        if (institution.applicationSystem === 'CAO') {
            return institution.caoApplicationUrl || 'https://www.cao.ac.za/apply';
        }
        return institution.applicationUrl || '#';
    };

    const provinces = [...new Set(institutions.map(inst => inst.address?.province).filter(Boolean))];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
            {/* Floating Help Guide */}
            <BeginnerGuide />

            <div className="container mx-auto px-4">
                {/* Header - Beginner Friendly */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        🎓 Find Your School
                    </h1>
                    <p className="text-lg text-gray-700 mb-4">
                        Search for universities, colleges, and training schools. Pick one and apply!
                    </p>
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r">
                        <p className="text-blue-900">
                            <strong>👇 Start here:</strong> Type the name of a school or province below
                        </p>
                    </div>
                </div>

                {/* Search and Filters - Beginner Friendly */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Search */}
                        <div className="md:col-span-2">
                            <label className="block text-base font-bold text-gray-900 mb-2">
                                <FaSearch className="inline mr-2 text-blue-600" />
                                What's the name of the school?
                            </label>
                            <input
                                type="text"
                                placeholder="Example: UNIZULU, Wits, False Bay..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <p className="text-sm text-gray-600 mt-1">💡 Type a few letters - we'll find it</p>
                        </div>

                        {/* Type Filter */}
                        <div>
                            <label className="block text-base font-bold text-gray-900 mb-2">
                                <FaFilter className="inline mr-2 text-blue-600" />
                                School Type
                            </label>
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">📚 All Types</option>
                                <option value="public_university">🎓 University</option>
                                <option value="cao_partner_college">🏫 College (CAO)</option>
                                <option value="tvet_college">🔧 Training College</option>
                                <option value="private_college">💼 Private College</option>
                            </select>
                            <p className="text-sm text-gray-600 mt-1">Not sure? Leave as "All Types"</p>
                        </div>

                        {/* Province Filter */}
                        <div>
                            <label className="block text-base font-bold text-gray-900 mb-2">
                                <FaFilter className="inline mr-2 text-blue-600" />
                                Your Province
                            </label>
                            <select
                                value={selectedProvince}
                                onChange={(e) => setSelectedProvince(e.target.value)}
                                className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">📍 All Provinces</option>
                                {provinces.map(province => (
                                    <option key={province} value={province}>{province}</option>
                                ))}
                            </select>
                            <p className="text-sm text-gray-600 mt-1">Find schools near you</p>
                        </div>
                    </div>

                    {/* Results counter */}
                    <div className="mt-6 text-center bg-green-50 p-4 rounded-lg border-2 border-green-200">
                        <p className="text-lg font-bold text-green-900">
                            ✅ Found <span className="text-2xl text-green-600">{filteredInstitutions.length}</span> school(s) for you
                        </p>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-b-blue-600"></div>
                        <p className="text-lg text-gray-600 mt-4 font-semibold">Loading schools for you...</p>
                    </div>
                )}

                {/* Institutions Grid */}
                {!loading && filteredInstitutions.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredInstitutions.map((institution) => (
                            <div
                                key={institution._id}
                                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border-l-4"
                                style={{
                                    borderColor:
                                        institution.type === 'public_university' ? '#16a34a' :
                                        institution.type === 'tvet_college' ? '#ea580c' :
                                        institution.type === 'cao_partner_college' ? '#16a34a' :
                                        '#a855f7'
                                }}
                            >
                                {/* Card Header */}
                                <div className="p-5 bg-gray-50 border-b-2">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
                                                {institution.name}
                                            </h3>
                                            {institution.code && (
                                                <p className="text-sm text-gray-600 font-mono mt-1">
                                                    Code: {institution.code}
                                                </p>
                                            )}
                                        </div>
                                        <div className="text-3xl ml-3">
                                            {getTypeIcon(institution.type)}
                                        </div>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-5 space-y-4">
                                    {/* Type Badge */}
                                    <div className="flex flex-wrap gap-2">
                                        <span className="inline-block px-4 py-2 text-sm font-bold rounded-full"
                                            style={{
                                                backgroundColor:
                                                    institution.type === 'public_university' ? '#dcfce7' :
                                                    institution.type === 'tvet_college' ? '#fed7aa' :
                                                    institution.type === 'cao_partner_college' ? '#dcfce7' :
                                                    '#f3e8ff',
                                                color:
                                                    institution.type === 'public_university' ? '#166534' :
                                                    institution.type === 'tvet_college' ? '#92400e' :
                                                    institution.type === 'cao_partner_college' ? '#166534' :
                                                    '#581c87'
                                            }}>
                                            {getTypeLabel(institution.type)}
                                        </span>
                                        <span className="inline-block px-4 py-2 text-sm font-bold rounded-full bg-blue-100 text-blue-800">
                                            {getApplicationLabel(institution.applicationSystem)}
                                        </span>
                                    </div>

                                    {/* Location */}
                                    {institution.address?.city && (
                                        <div className="text-base text-gray-700 font-semibold">
                                            📍 {institution.address.city}, {institution.address.province}
                                        </div>
                                    )}

                                    {/* Contact */}
                                    {institution.contact?.admissionsEmail && (
                                        <div className="text-sm text-gray-600 break-words">
                                            📧 <span className="font-mono">{institution.contact.admissionsEmail}</span>
                                        </div>
                                    )}
                                    {institution.contact?.phone && (
                                        <div className="text-sm text-gray-600">
                                            📞 <span className="font-mono">{institution.contact.phone}</span>
                                        </div>
                                    )}

                                    {/* TVET-specific info */}
                                    {institution.type === 'tvet_college' && institution.tvetInfo?.campus_locations && (
                                        <div className="text-base text-gray-700 font-semibold bg-orange-50 p-3 rounded">
                                            🏢 <strong>{institution.tvetInfo.campus_locations.length} campus location(s)</strong>
                                            <p className="text-sm text-gray-600 mt-1">
                                                This college has multiple locations to choose from
                                            </p>
                                        </div>
                                    )}

                                    {/* College accreditation */}
                                    {institution.collegeInfo && (
                                        <div className="text-sm bg-green-50 p-3 rounded">
                                            <div className="font-bold text-gray-900 mb-2">✓ Government Approved:</div>
                                            <div className="flex flex-wrap gap-2">
                                                {institution.collegeInfo.cheAccredited && (
                                                    <span className="inline-block px-3 py-1 text-xs font-bold bg-green-200 text-green-800 rounded">✓ CHE</span>
                                                )}
                                                {institution.collegeInfo.dhetAccredited && (
                                                    <span className="inline-block px-3 py-1 text-xs font-bold bg-green-200 text-green-800 rounded">✓ DHET</span>
                                                )}
                                                {institution.collegeInfo.setaAccredited && (
                                                    <span className="inline-block px-3 py-1 text-xs font-bold bg-green-200 text-green-800 rounded">✓ SETA</span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Card Footer */}
                                <div className="p-5 bg-gray-50 border-t-2 flex gap-3">
                                    <a
                                        href={getApplicationLink(institution)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2 text-base font-bold"
                                        title={`Click to apply to ${institution.name}`}
                                    >
                                        {institution.applicationSystem === 'CAO' ? '✓ Apply via CAO' : '✓ Apply Now'}
                                        <FaExternalLinkAlt size={14} />
                                    </a>
                                    {institution.web_pages?.[0] && (
                                        <a
                                            href={institution.web_pages[0]}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-3 border-2 border-gray-400 text-gray-700 rounded-lg hover:bg-gray-100 transition text-base font-bold"
                                            title={`Visit ${institution.name} website`}
                                        >
                                            🌐 Website
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* No results */}
                {!loading && filteredInstitutions.length === 0 && (
                    <div className="text-center py-16 bg-white rounded-lg shadow-md">
                        <p className="text-xl text-gray-600 font-semibold mb-4">
                            🤔 Hmm, can't find that school...
                        </p>
                        <p className="text-gray-600 mb-6 text-lg">
                            Try these ideas:
                        </p>
                        <ul className="text-left inline-block bg-gray-50 p-6 rounded-lg mb-6">
                            <li className="mb-3">✓ Check the spelling</li>
                            <li className="mb-3">✓ Remove the province filter</li>
                            <li className="mb-3">✓ Try a different school name</li>
                            <li className="mb-3">✓ Use "All Types" instead</li>
                        </ul>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedType('all');
                                setSelectedProvince('all');
                            }}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-base font-bold"
                        >
                            ← Start Over
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AllInstitutionsPage;
