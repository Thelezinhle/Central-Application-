import React, { useState } from 'react';
import CodeDecoder from '../utils/codeDecoder';
import './CourseCodeExplainer.css';

/**
 * CourseCodeExplainer Component
 * Shows first-time users what course codes mean
 * Can be displayed as:
 * - Tooltip on hover
 * - Expandable section
 * - Modal/popup
 */

export function CourseCodeExplainer({ courseCode, variant = 'inline' }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const decoded = CodeDecoder.decode(courseCode);
    const category = CodeDecoder.getCategory(courseCode);
    const color = CodeDecoder.getColor(courseCode.split('-')[0]);

    if (!decoded) {
        return null;
    }

    const InlineVersion = () => (
        <div className="code-explainer-inline">
            <div className="code-display">
                <span className="code-formatted">{CodeDecoder.format(courseCode)}</span>
                <span className="code-info-icon" title="Click for more details">ℹ</span>
            </div>
            <p className="code-simple-explanation">{decoded.fullDescription}</p>
        </div>
    );

    const ExpandableVersion = () => (
        <div className="code-explainer-expandable">
            <button 
                className="code-expand-btn"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <span className="code-badge" style={{ backgroundColor: color }}>
                    {courseCode}
                </span>
                <span className="expand-icon">{isExpanded ? '▼' : '▶'}</span>
            </button>
            
            {isExpanded && (
                <div className="code-details">
                    <div className="detail-row">
                        <label>Institution:</label>
                        <span>{decoded.institution}</span>
                    </div>
                    <div className="detail-row">
                        <label>Type:</label>
                        <span>{decoded.institutionType}</span>
                    </div>
                    <div className="detail-row">
                        <label>Location:</label>
                        <span>{decoded.institutionLocation}</span>
                    </div>
                    <div className="detail-row">
                        <label>Study Level:</label>
                        <span>{decoded.studyLevel}</span>
                    </div>
                    <div className="detail-row">
                        <label>Program:</label>
                        <span>{decoded.program}</span>
                    </div>
                    <div className="detail-row">
                        <label>Duration:</label>
                        <span>{decoded.estimatedDuration}</span>
                    </div>
                    <div className="full-description">
                        <p><strong>What this means:</strong></p>
                        <p>{decoded.fullDescription}</p>
                    </div>
                </div>
            )}
        </div>
    );

    const TooltipVersion = () => (
        <div className="code-explainer-tooltip" title={decoded.fullDescription}>
            <span className="code-with-tooltip">
                {courseCode}
                <span className="tooltip-icon">?</span>
            </span>
        </div>
    );

    // Render based on variant
    switch (variant) {
        case 'inline':
            return <InlineVersion />;
        case 'expandable':
            return <ExpandableVersion />;
        case 'tooltip':
            return <TooltipVersion />;
        default:
            return <InlineVersion />;
    }
}

/**
 * CourseCodeLegend Component
 * Shows the legend/guide for understanding codes
 * Display once at the top of the page or in a help section
 */

export function CourseCodeLegend() {
    const [activeTab, setActiveTab] = useState('how-to-read');

    return (
        <div className="code-legend-container">
            <h2>📚 Understanding CAO Course Codes</h2>
            
            <div className="legend-tabs">
                <button 
                    className={`tab ${activeTab === 'how-to-read' ? 'active' : ''}`}
                    onClick={() => setActiveTab('how-to-read')}
                >
                    How to Read Codes
                </button>
                <button 
                    className={`tab ${activeTab === 'abbreviations' ? 'active' : ''}`}
                    onClick={() => setActiveTab('abbreviations')}
                >
                    Code Guide
                </button>
                <button 
                    className={`tab ${activeTab === 'examples' ? 'active' : ''}`}
                    onClick={() => setActiveTab('examples')}
                >
                    Real Examples
                </button>
            </div>

            <div className="legend-content">
                {activeTab === 'how-to-read' && (
                    <div className="tab-content">
                        <h3>Code Structure</h3>
                        <div className="structure-example">
                            <div className="structure-line">
                                <span className="part">ZU</span>
                                <span className="dash">-</span>
                                <span className="part">M</span>
                                <span className="dash">-</span>
                                <span className="part">BAS</span>
                            </div>
                            <div className="structure-legend">
                                <div className="legend-item">
                                    <span className="legend-label">ZU</span>
                                    <span className="legend-desc">University Code</span>
                                </div>
                                <div className="legend-item">
                                    <span className="legend-label">M</span>
                                    <span className="legend-desc">Study Level (Master's, Bachelor's, etc)</span>
                                </div>
                                <div className="legend-item">
                                    <span className="legend-label">BAS</span>
                                    <span className="legend-desc">Program Abbreviation</span>
                                </div>
                            </div>
                        </div>

                        <h3>What Each Letter Means</h3>
                        <div className="codes-table">
                            <div className="table-header">
                                <span>Letter</span>
                                <span>Meaning</span>
                                <span>Example</span>
                            </div>
                            <div className="table-row">
                                <span className="code">B</span>
                                <span>Bachelor's Degree</span>
                                <span>3-4 years</span>
                            </div>
                            <div className="table-row">
                                <span className="code">M</span>
                                <span>Master's Degree</span>
                                <span>1-2 years</span>
                            </div>
                            <div className="table-row">
                                <span className="code">D</span>
                                <span>Diploma</span>
                                <span>2-3 years</span>
                            </div>
                            <div className="table-row">
                                <span className="code">H</span>
                                <span>Higher Certificate</span>
                                <span>1 year</span>
                            </div>
                            <div className="table-row">
                                <span className="code">N</span>
                                <span>TVET Certificate</span>
                                <span>1-3 years</span>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'abbreviations' && (
                    <div className="tab-content">
                        <h3>Common Program Abbreviations</h3>
                        <div className="abbreviations-grid">
                            <div className="abbr-group">
                                <h4>Business & Accounting</h4>
                                <ul>
                                    <li><strong>ACC</strong> - Accounting</li>
                                    <li><strong>BAS</strong> - Business Accounting Science</li>
                                    <li><strong>BCN</strong> - B Com Accounting</li>
                                    <li><strong>FIN</strong> - Finance</li>
                                    <li><strong>BSF</strong> - Business Science Finance</li>
                                </ul>
                            </div>
                            <div className="abbr-group">
                                <h4>Technology</h4>
                                <ul>
                                    <li><strong>IT</strong> - Information Technology</li>
                                    <li><strong>CS</strong> - Computer Science</li>
                                    <li><strong>NET</strong> - Networking</li>
                                    <li><strong>SOFT</strong> - Software</li>
                                </ul>
                            </div>
                            <div className="abbr-group">
                                <h4>Engineering & Trades</h4>
                                <ul>
                                    <li><strong>ENG</strong> - Engineering</li>
                                    <li><strong>ELEC</strong> - Electrical</li>
                                    <li><strong>MECH</strong> - Mechanical</li>
                                    <li><strong>WELD</strong> - Welding</li>
                                    <li><strong>PLUMB</strong> - Plumbing</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'examples' && (
                    <div className="tab-content">
                        <h3>Real Examples Explained</h3>
                        <div className="examples-list">
                            <div className="example-card">
                                <div className="example-code">ZU-M-BAS</div>
                                <div className="example-breakdown">
                                    <p><strong>University:</strong> Zululand University (ZU)</p>
                                    <p><strong>Level:</strong> Master's Degree (M)</p>
                                    <p><strong>Program:</strong> Business Accounting Science (BAS)</p>
                                </div>
                                <p className="example-meaning">
                                    ✓ This is a Master's Degree in Business Accounting Science from Zululand University (2 years)
                                </p>
                            </div>

                            <div className="example-card">
                                <div className="example-code">N3-ELEC</div>
                                <div className="example-breakdown">
                                    <p><strong>Level:</strong> TVET Level 3 Certificate (N3)</p>
                                    <p><strong>Program:</strong> Electrical Installation (ELEC)</p>
                                </div>
                                <p className="example-meaning">
                                    ✓ This is a TVET Level 3 Certificate in Electrical Installation (1 year, hands-on training)
                                </p>
                            </div>

                            <div className="example-card">
                                <div className="example-code">DIP-IT</div>
                                <div className="example-breakdown">
                                    <p><strong>Level:</strong> Diploma (D)</p>
                                    <p><strong>Program:</strong> Information Technology (IT)</p>
                                    <p><strong>Institution:</strong> Damelin College</p>
                                </div>
                                <p className="example-meaning">
                                    ✓ This is a 2-year Diploma in Information Technology from Damelin College
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

/**
 * QuickCodeTip Component
 * Small helpful tooltip for first-time users
 */

export function QuickCodeTip() {
    const [isDismissed, setIsDismissed] = useState(false);

    if (isDismissed) return null;

    return (
        <div className="quick-code-tip">
            <div className="tip-content">
                <span className="tip-icon">💡</span>
                <div className="tip-text">
                    <p><strong>First time here?</strong></p>
                    <p>Each course code tells you about the university, level, and program. 
                    Hover over any code to see what it means!</p>
                </div>
                <button 
                    className="tip-close"
                    onClick={() => setIsDismissed(true)}
                    aria-label="Close tip"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}

export default CourseCodeExplainer;
