import React, { useState, useMemo } from 'react';
import { FaSearch, FaBookmark, FaRegBookmark, FaExternalLinkAlt } from 'react-icons/fa';

const BURSARY_SOURCES = [
  // SOUTH AFRICA - GOVERNMENT
  {
    id: '1',
    name: 'NSFAS - National Student Financial Aid Scheme',
    url: 'https://www.nsfas.org.za/',
    category: 'Government',
    region: 'South Africa',
    description: 'Government funding for students from poor & working-class families',
    icon: 'university',
    featured: true,
  },
  {
    id: '2',
    name: 'DHET Bursaries Portal',
    url: 'https://bursaries.psc.gov.za/',
    category: 'Government',
    region: 'South Africa',
    description: 'Official government bursary database',
    icon: 'database',
  },
  {
    id: '3',
    name: 'Department of Basic Education Bursaries',
    url: 'https://www.education.gov.za/',
    category: 'Government',
    region: 'South Africa',
    description: 'Bursaries for teaching and education fields',
    icon: 'graduation-cap',
  },

  // SOUTH AFRICA - AGGREGATORS
  {
    id: '4',
    name: 'CareerWise Bursaries',
    url: 'https://careerwise.co.za/bursaries/',
    category: 'Aggregator',
    region: 'South Africa',
    description: 'Daily updated bursaries categorized by field of study',
    icon: 'search',
    featured: true,
  },
  {
    id: '5',
    name: 'Zabusaries',
    url: 'https://zabusaries.com/',
    category: 'Aggregator',
    region: 'South Africa',
    description: 'Comprehensive bursary listings with application tips',
    icon: 'list',
  },
  {
    id: '6',
    name: 'Bursaries South Africa',
    url: 'https://bursaries-sa.co.za/',
    category: 'Aggregator',
    region: 'South Africa',
    description: 'Extensive database of South African bursaries',
    icon: 'globe',
  },
  {
    id: '7',
    name: 'All Bursaries South Africa',
    url: 'https://allbursaries.co.za/',
    category: 'Aggregator',
    region: 'South Africa',
    description: 'Simple, clean interface with filtered searches',
    icon: 'filter',
  },
  {
    id: '8',
    name: 'SA Study',
    url: 'https://www.sastudy.com/',
    category: 'Aggregator',
    region: 'South Africa',
    description: 'Bursaries, scholarships, and career guidance',
    icon: 'graduation-cap',
  },

  // SOUTH AFRICA - CORPORATE
  {
    id: '9',
    name: 'Sasol Bursaries',
    url: 'https://www.sasol.com/careers/students-graduates/bursaries',
    category: 'Corporate',
    region: 'South Africa',
    description: 'Engineering, science, and commerce bursaries',
    icon: 'industry',
  },
  {
    id: '10',
    name: 'Transnet Bursaries',
    url: 'https://www.transnet.net/Careers/Pages/Bursaries.aspx',
    category: 'Corporate',
    region: 'South Africa',
    description: 'Engineering, transport, and logistics funding',
    icon: 'industry',
  },
  {
    id: '11',
    name: 'Anglo American Bursaries',
    url: 'https://www.angloamerican.com/careers/students-and-graduates/bursaries',
    category: 'Corporate',
    region: 'South Africa',
    description: 'Mining, engineering, and related fields',
    icon: 'industry',
  },
  {
    id: '12',
    name: 'Standard Bank Bursaries',
    url: 'https://www.standardbank.co.za/southafrica/personal/products-and-services/bursaries',
    category: 'Corporate',
    region: 'South Africa',
    description: 'Commerce, finance, and business studies',
    icon: 'money-check-alt',
  },

  // SOUTH AFRICA - PROFESSIONAL BODIES
  {
    id: '13',
    name: 'SAICA Bursaries (Accounting)',
    url: 'https://www.saica.co.za/',
    category: 'Professional Body',
    region: 'South Africa',
    description: 'Chartered Accountancy bursaries and scholarships',
    icon: 'database',
  },
  {
    id: '14',
    name: 'ECSA Bursaries (Engineering)',
    url: 'https://www.ecsa.co.za/',
    category: 'Professional Body',
    region: 'South Africa',
    description: 'Engineering Council of South Africa funding',
    icon: 'industry',
  },

  // INTERNATIONAL - SCHOLARSHIP PORTALS
  {
    id: '15',
    name: 'ScholarshipPortal',
    url: 'https://scholarshipportal.com/',
    category: 'International Portal',
    region: 'Global',
    description: 'Thousands of scholarships worldwide, especially Europe',
    icon: 'passport',
    featured: true,
  },
  {
    id: '16',
    name: 'Scholarships.com',
    url: 'https://www.scholarships.com/',
    category: 'International Portal',
    region: 'Global',
    description: 'Massive database for US and international scholarships',
    icon: 'globe',
  },
  {
    id: '17',
    name: 'International Scholarships',
    url: 'https://www.internationalscholarships.com/',
    category: 'International Portal',
    region: 'Global',
    description: 'Dedicated to study abroad funding',
    icon: 'plane',
  },
  {
    id: '18',
    name: 'Fastweb',
    url: 'https://www.fastweb.com/',
    category: 'International Portal',
    region: 'Global',
    description: 'US-focused scholarship matching service',
    icon: 'search',
  },

  // INTERNATIONAL - GOVERNMENT PROGRAMS
  {
    id: '19',
    name: 'Chevening Scholarships (UK)',
    url: 'https://www.chevening.org/',
    category: 'Government Program',
    region: 'United Kingdom',
    description: 'UK government global scholarship programme',
    icon: 'crown',
    featured: true,
  },
  {
    id: '20',
    name: 'DAAD Scholarships (Germany)',
    url: 'https://www.daad.de/en/',
    category: 'Government Program',
    region: 'Germany',
    description: 'German Academic Exchange Service scholarships',
    icon: 'university',
    featured: true,
  },
  {
    id: '21',
    name: 'Fulbright Program (USA)',
    url: 'https://fulbright.edu/',
    category: 'Government Program',
    region: 'United States',
    description: 'US government international educational exchange',
    icon: 'graduation-cap',
  },
  {
    id: '22',
    name: 'Australia Awards',
    url: 'https://www.dfat.gov.au/people-to-people/australia-awards',
    category: 'Government Program',
    region: 'Australia',
    description: 'Australian government scholarships for developing countries',
    icon: 'globe',
  },
  {
    id: '23',
    name: 'Vanier Canada Scholarships',
    url: 'https://vanier.gc.ca/en/home-accueil.html',
    category: 'Government Program',
    region: 'Canada',
    description: 'Canadian government doctoral scholarships',
    icon: 'graduation-cap',
  },

  // INTERNATIONAL - UNIVERSITY DIRECT
  {
    id: '24',
    name: 'QS Scholarships',
    url: 'https://www.topuniversities.com/student-info/scholarships',
    category: 'University Portal',
    region: 'Global',
    description: 'Scholarships at top universities worldwide',
    icon: 'star',
  },
  {
    id: '25',
    name: 'The Scholarship Hub (UK)',
    url: 'https://www.thescholarshiphub.org.uk/',
    category: 'University Portal',
    region: 'United Kingdom',
    description: 'UK university scholarships database',
    icon: 'university',
  },
];

const CATEGORIES = [
  { id: 'all', name: 'All Sources' },
  { id: 'Government', name: 'Government' },
  { id: 'Aggregator', name: 'Aggregators' },
  { id: 'Corporate', name: 'Corporate' },
  { id: 'Professional Body', name: 'Professional' },
  { id: 'International Portal', name: 'Global Portals' },
  { id: 'Government Program', name: 'Gov Programs' },
  { id: 'University Portal', name: 'University' },
];

const REGIONS = [
  { id: 'all', name: 'All Regions' },
  { id: 'South Africa', name: 'South Africa' },
  { id: 'Global', name: 'Global' },
  { id: 'United Kingdom', name: 'UK' },
  { id: 'United States', name: 'USA' },
  { id: 'Germany', name: 'Germany' },
  { id: 'Australia', name: 'Australia' },
  { id: 'Canada', name: 'Canada' },
];



function BursarySourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [savedItems, setSavedItems] = useState([]);

  // Group sources by region
  const sourcesByRegion = useMemo(() => {
    const grouped = {};
    BURSARY_SOURCES.forEach((source) => {
      if (!grouped[source.region]) {
        grouped[source.region] = [];
      }
      grouped[source.region].push(source);
    });

    // Filter by search
    if (searchQuery.trim()) {
      Object.keys(grouped).forEach((region) => {
        grouped[region] = grouped[region].filter(
          (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (grouped[region].length === 0) {
          delete grouped[region];
        }
      });
    }

    return grouped;
  }, [searchQuery]);

  const handleSaveItem = (id) => {
    if (savedItems.includes(id)) {
      setSavedItems(savedItems.filter((itemId) => itemId !== id));
    } else {
      setSavedItems([...savedItems, id]);
    }
  };

  const handleOpenLink = (url) => {
    window.open(url, '_blank');
  };

  const regionOrder = [
    'South Africa',
    'Global',
    'United Kingdom',
    'United States',
    'Germany',
    'Australia',
    'Canada',
  ];

  const sortedRegions = Object.keys(sourcesByRegion).sort(
    (a, b) => regionOrder.indexOf(a) - regionOrder.indexOf(b)
  );

  return (
    <div className="min-h-screen bg-green-600">
      {/* Header */}
      <div className="bg-green-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <FaExternalLinkAlt size={40} />
            Bursary & Scholarship Sources
          </h1>
          <p className="text-lg text-green-50">
            Explore trusted resources for funding your studies locally and internationally
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="flex items-center bg-white border-2 border-green-400 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
            <FaSearch className="text-green-500 mr-3 text-lg" />
            <input
              type="text"
              placeholder="Search sources by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 outline-none text-gray-800 placeholder-gray-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-green-500 hover:text-green-700 ml-2 text-lg font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Regions with Bursaries */}
        {sortedRegions.length > 0 ? (
          <div className="space-y-12">
            {sortedRegions.map((region) => (
              <div key={region}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-gray-300">
                  {region} Bursaries
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sourcesByRegion[region].map((source) => (
                    <div
                      key={source.id}
                      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-5 border border-gray-200"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">
                            {source.name}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 rounded text-xs font-semibold bg-green-100 text-green-700">
                              {source.category}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleSaveItem(source.id)}
                          className="text-lg hover:scale-125 transition-all ml-2 flex-shrink-0"
                        >
                          {savedItems.includes(source.id) ? (
                            <FaBookmark className="text-green-600" />
                          ) : (
                            <FaRegBookmark className="text-green-400 hover:text-green-600" />
                          )}
                        </button>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {source.description}
                      </p>

                      {/* Action Button */}
                      <button
                        onClick={() => handleOpenLink(source.url)}
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-2 px-4 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm"
                      >
                        <FaExternalLinkAlt size={14} />
                        Visit Website
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500 text-lg font-medium">
              No sources found. Try a different search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BursarySourcesPage;
