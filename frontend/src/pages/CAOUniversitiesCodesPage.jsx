import React, { useState, useMemo } from 'react';
import { FaUniversity, FaChevronDown, FaChevronUp, FaSearch } from 'react-icons/fa';
import { getProgrammesByInstitution, getUniqueInstitutions, allCAOProgrammes } from '../data/caoDataLoader.js';
import './CAOUniversitiesCodesPage.css';

/**
 * CAO Universities & Codes Page - Complete CAO Database
 * Displays all CAO universities and colleges with ALL available courses
 */

function CAOUniversitiesCodesPage() {
    const [expandedInstitutions, setExpandedInstitutions] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('all');

    // Helper functions
    function getInstitutionType(name) {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('university')) return 'University';
        if (lowerName.includes('tvet')) return 'TVET College';
        if (lowerName.includes('college')) return 'College';
        return 'Institution';
    }

    function getTypeColor(type) {
        switch(type) {
            case 'University': return '#2d8f2d';
            case 'TVET College': return '#1a5a1a';
            case 'College': return '#4CAF50';
            default: return '#2d8f2d';
        }
    }

    // Get all data from CAO programmes
    const programmesByInstitution = useMemo(() => getProgrammesByInstitution(), []);
    const institutionsList = useMemo(() => getUniqueInstitutions(), []);

    // Build institution data with all programmes
    const institutionData = useMemo(() => {
        return institutionsList
            .map(institutionName => {
                const programmes = programmesByInstitution[institutionName] || [];
                return {
                    name: institutionName,
                    type: getInstitutionType(institutionName),
                    programmesCount: programmes.length,
                    programmes: programmes,
                    codes: programmes.map(p => p.code),
                    categories: [...new Set(programmes.map(p => p.category))]
                };
            })
            .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by full name
    }, [institutionsList, programmesByInstitution]);

    // Filter institutions
    const filteredInstitutions = useMemo(() => {
        return institutionData.filter(inst => {
            const matchesSearch = inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                inst.codes.some(c => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
                                inst.programmes.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
            
            if (filterType === 'all') {
                return matchesSearch;
            }
            return matchesSearch && inst.type.toLowerCase().includes(filterType);
        });
    }, [institutionData, searchQuery, filterType]);

    const toggleInstitution = (name) => {
        setExpandedInstitutions(prev => ({
            ...prev,
            [name]: !prev[name]
        }));
    };

    return (
        <div className="cao-universities-page">
            {/* Header */}
            <div className="page-header">
                <div className="header-content">
                    <div className="header-icon">
                        <FaUniversity />
                    </div>
                    <div className="header-text">
                        <h1>CAO Universities & Colleges Database</h1>
                        <p>{allCAOProgrammes.length} programmes available across {institutionsList.length} institutions</p>
                    </div>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="filters-section">
                <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div className="search-box" style={{ flex: 1, minWidth: '250px' }}>
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search by institution, code, or programme name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    <div className="filter-buttons">
                        <button
                            className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
                            onClick={() => setFilterType('all')}
                        >
                            All ({institutionData.length})
                        </button>
                        <button
                            className={`filter-btn ${filterType === 'university' ? 'active' : ''}`}
                            onClick={() => setFilterType('university')}
                        >
                            Universities
                        </button>
                        <button
                            className={`filter-btn ${filterType === 'tvet' ? 'active' : ''}`}
                            onClick={() => setFilterType('tvet')}
                        >
                            TVET Colleges
                        </button>
                        <button
                            className={`filter-btn ${filterType === 'college' ? 'active' : ''}`}
                            onClick={() => setFilterType('college')}
                        >
                            Other Colleges
                        </button>
                    </div>
                </div>
            </div>

            {/* Info Message */}
            {searchQuery && (
                <div className="info-message">
                    Found {filteredInstitutions.length} institution{filteredInstitutions.length !== 1 ? 's' : ''} matching "{searchQuery}"
                </div>
            )}

            {/* Institutions List */}
            <div className="universities-container">
                {filteredInstitutions.length > 0 ? (
                    filteredInstitutions.map((inst) => (
                        <div key={inst.name} className="university-card">
                            {/* Institution Header */}
                            <button
                                className="university-header"
                                onClick={() => toggleInstitution(inst.name)}
                                style={{ backgroundColor: getTypeColor(inst.type) }}
                            >
                                <div className="uni-info">
                                    <div className="uni-icon">
                                        📚
                                    </div>
                                    <div className="uni-details">
                                        <h2 className="uni-name">{inst.name}</h2>
                                        <div className="uni-meta">
                                            <span className="uni-type">{inst.type}</span>
                                            <span className="code-count">{inst.programmesCount} programmes</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="expand-icon">
                                    {expandedInstitutions[inst.name] ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                            </button>

                            {/* Programmes - Expandable */}
                            {expandedInstitutions[inst.name] && (
                                <div className="codes-section">
                                    <div className="codes-header">
                                        <h3>All Programmes ({inst.programmes.length} available)</h3>
                                        <p className="codes-intro">
                                            Complete list of all programmes offered by {inst.name}
                                        </p>
                                    </div>

                                    <div className="codes-grid">
                                        {inst.programmes.map((programme) => (
                                            <div key={programme.code} className="code-item">
                                                <div className="code-badge" style={{ backgroundColor: getTypeColor(inst.type) }}>
                                                    {programme.code}
                                                </div>
                                                <div className="code-info">
                                                    <p className="code-program">{programme.name.replace(/\n/g, ' ')}</p>
                                                    <p className="code-entry-points">
                                                        <span style={{ color: '#2d8f2d', fontWeight: 'bold' }}>Entry Points: </span>
                                                        {programme.entryPoints || 'Contact institution'}
                                                    </p>
                                                    <details className="code-details-dropdown">
                                                        <summary>Programme Details</summary>
                                                        <div className="code-explanation">
                                                            <div className="explanation-item">
                                                                <span className="label">Category:</span>
                                                                <span className="value">{programme.category}</span>
                                                            </div>
                                                            <div className="explanation-item">
                                                                <span className="label">Institution Type:</span>
                                                                <span className="value">{inst.type}</span>
                                                            </div>
                                                            {programme.page && (
                                                                <div className="explanation-item">
                                                                    <span className="label">CAO Handbook Page:</span>
                                                                    <span className="value">{programme.page}</span>
                                                                </div>
                                                            )}
                                                            <div className="explanation-summary">
                                                                Programme Code: <strong>{programme.code}</strong> | Category: <strong>{programme.category}</strong> | Entry Points: <strong>{programme.entryPoints || 'Contact institution'}</strong>
                                                            </div>
                                                        </div>
                                                    </details>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* How to Read Codes */}
                                    <div className="how-to-read">
                                        <h4>💡 Understanding Codes</h4>
                                        <div className="code-format-example">
                                            <p className="format-desc">
                                                Programme codes help identify the institution, level, and field of study. Example: <strong>ZU-M-BAS</strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="no-results">
                        <FaSearch className="no-results-icon" />
                        <h3>No institutions found</h3>
                        <p>Try adjusting your search or filter criteria</p>
                    </div>
                )}
            </div>

            {/* Quick Reference */}
            <div className="quick-reference">
                <h3>📊 Statistics</h3>
                <div className="reference-grid">
                    <div className="reference-item">
                        <span className="ref-code">{institutionsList.length}</span>
                        <span className="ref-desc">Total Institutions</span>
                    </div>
                    <div className="reference-item">
                        <span className="ref-code">{allCAOProgrammes.length}</span>
                        <span className="ref-desc">Total Programmes</span>
                    </div>
                    <div className="reference-item">
                        <span className="ref-code">{[...new Set(allCAOProgrammes.map(p => p.category))].length}</span>
                        <span className="ref-desc">Study Categories</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CAOUniversitiesCodesPage;
