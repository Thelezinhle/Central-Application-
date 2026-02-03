import React, { useEffect, useState } from 'react';
import { cachedGet } from '../utils/apiClient';
import { 
    FaSearch, FaFilter, FaCheckCircle, FaTimesCircle, 
    FaChevronDown, FaChevronUp, FaMapMarkerAlt, FaBook,
    FaDownload, FaExternalLinkAlt
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../context/authStore';
import '../styles/CAOCoursesPage.css';

function CAOCoursesPage() {
    const { user } = useAuthStore();
    const navigate = useNavigate();
    
    const [programmes, setProgrammes] = useState([]);
    const [filteredProgrammes, setFilteredProgrammes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProgrammes, setSelectedProgrammes] = useState([]);
    
    // Filter states
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedInstitution, setSelectedInstitution] = useState('all');
    const [institutions, setInstitutions] = useState([]);
    const [expandedInstitution, setExpandedInstitution] = useState(null);
    const [showSelectedOnly, setShowSelectedOnly] = useState(false);
    
    const apiBase = 'http://localhost:5000/api/courses';

    useEffect(() => {
        fetchCAOProgrammes();
    }, []);

    useEffect(() => {
        filterAndDisplayProgrammes();
    }, [programmes, searchQuery, selectedInstitution, showSelectedOnly]);

    const fetchCAOProgrammes = async () => {
        try {
            setLoading(true);
            // Fetch courses with CAO data
            const data = await cachedGet(`${apiBase}?hasCAO=true&limit=5000`);
            
            if (data && data.data) {
                const caoProgrammes = data.data.filter(course => 
                    course.cao && course.cao.programmeCode
                );
                
                setProgrammes(caoProgrammes);
                
                // Extract unique institutions
                const uniqueInstitutions = [
                    ...new Set(caoProgrammes.map(p => p.cao.institution))
                ].sort();
                
                setInstitutions(uniqueInstitutions);
                console.log(`Loaded ${caoProgrammes.length} CAO programmes from ${uniqueInstitutions.length} institutions`);
            }
        } catch (error) {
            console.error('Error fetching CAO programmes:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterAndDisplayProgrammes = () => {
        let filtered = programmes;

        // Filter by institution
        if (selectedInstitution !== 'all') {
            filtered = filtered.filter(p => p.cao.institution === selectedInstitution);
        }

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(p =>
                p.cao.programmeCode.toLowerCase().includes(query) ||
                p.name.toLowerCase().includes(query) ||
                p.cao.institution.toLowerCase().includes(query)
            );
        }

        // Show selected only
        if (showSelectedOnly) {
            filtered = filtered.filter(p => 
                selectedProgrammes.some(s => s._id === p._id)
            );
        }

        setFilteredProgrammes(filtered);
    };

    const toggleProgrammeSelection = (programme) => {
        if (selectedProgrammes.some(p => p._id === programme._id)) {
            setSelectedProgrammes(selectedProgrammes.filter(p => p._id !== programme._id));
        } else {
            setSelectedProgrammes([...selectedProgrammes, programme]);
        }
    };

    const toggleAllInInstitution = (institution) => {
        const institutionProgrammes = filteredProgrammes.filter(
            p => p.cao.institution === institution
        );

        const allSelected = institutionProgrammes.every(p =>
            selectedProgrammes.some(s => s._id === p._id)
        );

        if (allSelected) {
            setSelectedProgrammes(
                selectedProgrammes.filter(
                    p => !institutionProgrammes.some(ip => ip._id === p._id)
                )
            );
        } else {
            const newSelections = institutionProgrammes.filter(
                p => !selectedProgrammes.some(s => s._id === p._id)
            );
            setSelectedProgrammes([...selectedProgrammes, ...newSelections]);
        }
    };

    const downloadAsCSV = () => {
        const headers = ['Programme Code', 'Programme Name', 'Institution', 'Handbook Page'];
        const rows = selectedProgrammes.length > 0 ? selectedProgrammes : filteredProgrammes;

        const csvContent = [
            headers.join(','),
            ...rows.map(p => 
                `"${p.cao.programmeCode}","${p.name}","${p.cao.institution}","${p.cao.handbookPage || 'N/A'}"`
            )
        ].join('\n');

        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent));
        element.setAttribute('download', 'cao_programmes.csv');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const downloadAsJSON = () => {
        const rows = selectedProgrammes.length > 0 ? selectedProgrammes : filteredProgrammes;
        const jsonData = rows.map(p => ({
            programme_code: p.cao.programmeCode,
            programme_name: p.name,
            institution: p.cao.institution,
            handbook_page: p.cao.handbookPage
        }));

        const element = document.createElement('a');
        element.setAttribute(
            'href',
            'data:text/json;charset=utf-8,' + 
            encodeURIComponent(JSON.stringify(jsonData, null, 2))
        );
        element.setAttribute('download', 'cao_programmes.json');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const groupedProgrammes = () => {
        if (filteredProgrammes.length === 0) return {};

        const grouped = {};
        filteredProgrammes.forEach(programme => {
            const institution = programme.cao.institution;
            if (!grouped[institution]) {
                grouped[institution] = [];
            }
            grouped[institution].push(programme);
        });

        return grouped;
    };

    if (loading) {
        return (
            <div className="cao-page loading-container">
                <div className="spinner"></div>
                <p>Loading CAO programmes...</p>
            </div>
        );
    }

    const grouped = groupedProgrammes();
    const displayRows = showSelectedOnly ? selectedProgrammes : filteredProgrammes;

    return (
        <div className="cao-page">
            {/* Header - Beginner Friendly */}
            <div className="cao-header" style={{background: 'linear-gradient(135deg, #228B22 0%, #1a6b1a 100%)', color: 'white', padding: '40px 20px'}}>
                <div className="cao-header-content" style={{maxWidth: '1200px', margin: '0 auto'}}>
                    <h1 style={{fontSize: '32px', fontWeight: 'bold', marginBottom: '10px'}}>
                        CAO Handbook {programmes.length > 0 ? '2026' : 'Loading...'}
                    </h1>
                    <p className="cao-subtitle" style={{fontSize: '18px', marginBottom: '15px', opacity: 0.95}}>
                        All {programmes.length} official programmes from {institutions.length} South African institutions
                    </p>
                    <p style={{fontSize: '16px', marginBottom: '0', opacity: 0.9}}>
                        Search for your course • Find your institution • Save your choices
                    </p>
                </div>
            </div>

            {/* Quick Info Cards */}
            {programmes.length > 0 && (
                <div style={{maxWidth: '1200px', margin: '20px auto', padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px'}}>
                    <div style={{backgroundColor: '#dcfce7', padding: '15px', borderRadius: '8px', textAlign: 'center', borderLeft: '4px solid #16a34a'}}>
                        <div style={{fontSize: '28px', fontWeight: 'bold', color: '#166534'}}>719</div>
                        <div style={{fontSize: '14px', color: '#0c4a6e', fontWeight: '600'}}>Total Programmes</div>
                    </div>
                    <div style={{backgroundColor: '#dcfce7', padding: '15px', borderRadius: '8px', textAlign: 'center', borderLeft: '4px solid #16a34a'}}>
                        <div style={{fontSize: '28px', fontWeight: 'bold', color: '#166534'}}>21</div>
                        <div style={{fontSize: '14px', color: '#15803d', fontWeight: '600'}}>Institutions</div>
                    </div>
                    <div style={{backgroundColor: '#fef3c7', padding: '15px', borderRadius: '8px', textAlign: 'center', borderLeft: '4px solid #f59e0b'}}>
                        <div style={{fontSize: '28px', fontWeight: 'bold', color: '#b45309'}}>100%</div>
                        <div style={{fontSize: '14px', color: '#92400e', fontWeight: '600'}}>Official Data</div>
                    </div>
                </div>
            )}

            {/* Controls */}
            <div className="cao-controls" style={{maxWidth: '1200px', margin: '20px auto', padding: '0 20px'}}>
                <div className="search-section">
                    <label style={{fontSize: '16px', fontWeight: 'bold', color: '#1f2937', display: 'block', marginBottom: '8px'}}>
                        🔍 What course are you looking for?
                    </label>
                    <div className="search-box" style={{display: 'flex', alignItems: 'center', backgroundColor: 'white', border: '2px solid #ddd', borderRadius: '8px', padding: '10px'}}>
                        <FaSearch className="search-icon" style={{color: '#16a34a', marginRight: '10px', fontSize: '16px'}} />
                        <input
                            type="text"
                            placeholder="Example: ZU-M-BAS (B Accounting), or type 'nursing'..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                            style={{flex: 1, border: 'none', outline: 'none', fontSize: '16px'}}
                        />
                    </div>
                    <p style={{fontSize: '13px', color: '#6b7280', marginTop: '5px'}}>Type a code, programme name, or institution name</p>
                </div>

                <div className="filter-section" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', marginTop: '20px'}}>
                    <div className="filter-group">
                        <label htmlFor="institution-filter" style={{fontSize: '16px', fontWeight: 'bold', color: '#1f2937', display: 'block', marginBottom: '8px'}}>
                            Which school?
                        </label>
                        <select
                            id="institution-filter"
                            value={selectedInstitution}
                            onChange={(e) => setSelectedInstitution(e.target.value)}
                            className="filter-select"
                            style={{width: '100%', fontSize: '16px', padding: '10px', borderRadius: '8px', border: '2px solid #ddd', cursor: 'pointer', backgroundColor: 'white', color: 'black'}}
                        >
                            <option value="all" style={{backgroundColor: 'white', color: 'black'}}>All Schools ({programmes.length})</option>
                            {institutions.map(inst => {
                                const count = programmes.filter(p => p.cao.institution === inst).length;
                                return (
                                    <option key={inst} value={inst} style={{backgroundColor: 'white', color: 'black'}}>
                                        {inst} ({count} courses)
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    <div className="selection-group">
                        <label style={{fontSize: '16px', fontWeight: 'bold', color: '#1f2937', display: 'block', marginBottom: '8px'}}>
                            Your Picks
                        </label>
                        <button
                            className={`toggle-btn ${showSelectedOnly ? 'active' : ''}`}
                            onClick={() => setShowSelectedOnly(!showSelectedOnly)}
                            style={{width: '100%', fontSize: '16px', padding: '10px', borderRadius: '8px', border: '2px solid #16a34a', backgroundColor: showSelectedOnly ? '#16a34a' : 'white', color: showSelectedOnly ? 'white' : '#16a34a', cursor: 'pointer', fontWeight: 'bold'}}
                        >
                            <FaCheckCircle style={{marginRight: '8px'}} />
                            {selectedProgrammes.length > 0 
                                ? `Saved (${selectedProgrammes.length})` 
                                : 'Click to see saved'}
                        </button>
                    </div>
                </div>

                <div className="action-buttons" style={{display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '15px'}}>
                    <button 
                        className="download-btn csv-btn"
                        onClick={downloadAsCSV}
                        disabled={displayRows.length === 0}
                        title="Download as CSV (Excel)"
                        style={{fontSize: '16px', padding: '12px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold', backgroundColor: displayRows.length > 0 ? '#16a34a' : '#ccc', color: 'white'}}
                    >
                        <FaDownload style={{marginRight: '8px'}} /> Download Excel
                    </button>
                    <button 
                        className="download-btn json-btn"
                        onClick={downloadAsJSON}
                        disabled={displayRows.length === 0}
                        title="Download as JSON"
                        style={{fontSize: '16px', padding: '12px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold', backgroundColor: displayRows.length > 0 ? '#16a34a' : '#ccc', color: 'white'}}
                    >
                        <FaDownload style={{marginRight: '8px'}} /> Download Data
                    </button>
                </div>
            </div>

            {/* Results Summary */}
            <div className="results-summary" style={{maxWidth: '1200px', margin: '20px auto', padding: '15px 20px', backgroundColor: '#f0f9ff', borderLeft: '4px solid #16a34a', borderRadius: '8px'}}>
                <p style={{fontSize: '16px', margin: 0}}>
                    Found <strong style={{color: '#16a34a', fontSize: '18px'}}>{filteredProgrammes.length}</strong> of{' '}
                    <strong style={{color: '#1f2937', fontSize: '18px'}}>{programmes.length}</strong> total courses
                    {selectedProgrammes.length > 0 && (
                        <span> • You've saved <strong style={{color: '#16a34a', fontSize: '18px'}}>{selectedProgrammes.length}</strong> to your list</span>
                    )}
                </p>
            </div>

            {/* Programmes List */}
            <div className="cao-programmes-container" style={{maxWidth: '1200px', margin: '20px auto', padding: '0 20px'}}>
                {Object.keys(grouped).length === 0 ? (
                    <div className="no-results" style={{textAlign: 'center', padding: '40px 20px', backgroundColor: '#fff7ed', borderRadius: '8px', marginTop: '20px'}}>
                        <div style={{fontSize: '48px', marginBottom: '15px'}}>🔍</div>
                        <p style={{fontSize: '18px', fontWeight: 'bold', color: '#d97706', marginBottom: '10px'}}>Hmm, no programmes found</p>
                        <p style={{fontSize: '16px', color: '#92400e'}}>Try searching for a different course name, code, or institution</p>
                        <button 
                            onClick={() => {setSearchQuery(''); setSelectedInstitution('all');}}
                            style={{marginTop: '15px', fontSize: '16px', padding: '10px 20px', backgroundColor: '#d97706', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'}}
                        >
                            Clear Filters & See All
                        </button>
                    </div>
                ) : (
                    Object.entries(grouped).map(([institution, progs]) => (
                        <div key={institution} className="institution-group" style={{marginBottom: '20px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e5e7eb'}}>
                            <div 
                                className="institution-header"
                                onClick={() => setExpandedInstitution(
                                    expandedInstitution === institution ? null : institution
                                )}
                                role="button"
                                tabIndex={0}
                                style={{backgroundColor: '#16a34a', padding: '20px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', hover: {backgroundColor: '#15803d'}}}
                            >
                                <div className="institution-title" style={{display: 'flex', alignItems: 'center', gap: '12px', flex: 1}}>
                                    <h2 style={{fontSize: '22px', fontWeight: 'bold', color: 'white', margin: 0}}>
                                        {institution}
                                    </h2>
                                    <span className="programme-count" style={{backgroundColor: 'white', color: '#16a34a', padding: '6px 12px', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold'}}>{progs.length} programmes</span>
                                </div>
                                <div className="expand-icon" style={{color: 'white', fontSize: '18px'}}>
                                    {expandedInstitution === institution ? 
                                        <FaChevronUp /> : <FaChevronDown />
                                    }
                                </div>
                            </div>

                            {expandedInstitution === institution && (
                                <div className="programmes-list">
                                    {progs.map((programme) => (
                                        <div 
                                            key={programme._id}
                                            className={`programme-card ${
                                                selectedProgrammes.some(p => p._id === programme._id) 
                                                    ? 'selected' 
                                                    : ''
                                            }`}
                                            style={{
                                                padding: '15px',
                                                borderBottom: '1px solid #e5e7eb',
                                                display: 'flex',
                                                gap: '12px',
                                                backgroundColor: selectedProgrammes.some(p => p._id === programme._id) ? '#dbeafe' : 'white',
                                                transition: 'background-color 0.2s'
                                            }}
                                        >
                                            <div className="programme-checkbox" style={{flexShrink: 0, paddingTop: '3px'}}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedProgrammes.some(
                                                        p => p._id === programme._id
                                                    )}
                                                    onChange={() => toggleProgrammeSelection(programme)}
                                                    style={{width: '18px', height: '18px', cursor: 'pointer'}}
                                                />
                                            </div>

                                            <div className="programme-details" style={{flex: 1}}>
                                                <div className="programme-code-section" style={{display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '5px'}}>
                                                    <code className="cao-code" style={{backgroundColor: '#f3f4f6', color: '#166534', padding: '4px 8px', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold', fontFamily: 'monospace'}}>
                                                        {programme.cao.programmeCode}
                                                    </code>
                                                    {programme.cao.verified && (
                                                        <span className="verified-badge" title="Verified by CAO" style={{backgroundColor: '#dcfce7', color: '#15803d', padding: '2px 6px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold'}}>
                                                            Official
                                                        </span>
                                                    )}
                                                </div>
                                                <h3 style={{fontSize: '16px', fontWeight: '600', color: '#1f2937', margin: '5px 0'}}>{programme.name}</h3>
                                                {programme.cao.handbookPage && (
                                                    <p style={{fontSize: '13px', color: '#6b7280', margin: '3px 0'}}>
                                                        📄 Page: {programme.cao.handbookPage}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="programme-actions" style={{flexShrink: 0}}>
                                                <button 
                                                    className="info-btn"
                                                    title="View programme details"
                                                    onClick={() => navigate(`/course/${programme._id}`)}
                                                >
                                                    <FaExternalLinkAlt />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* Footer Info */}
            {programmes.length > 0 && (
                <div className="cao-footer">
                    <p>
                        <strong>Data Source:</strong> CAO Handbook 2026 Entry
                    </p>
                    <p>
                        <strong>Total Institutions:</strong> {institutions.length}
                    </p>
                    <p>
                        <strong>Total Programmes:</strong> {programmes.length}
                    </p>
                </div>
            )}
        </div>
    );
}

export default CAOCoursesPage;
