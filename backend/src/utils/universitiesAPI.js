/**
 * Multi-Source Free Universities API Service
 * Uses 5 completely free APIs with no payment/registration required
 * 
 * Sources:
 * 1. Hipo API - 11K+ universities worldwide
 * 2. Wikidata SPARQL - Detailed university information
 * 3. OpenStreetMap Overpass - Geolocation data
 * 4. Wikipedia API - Country-specific lists
 * 5. OpenAlex - Academic institutions database
 */

const HIPO_API_BASE = 'http://universities.hipolabs.com/search';
const WIKIDATA_SPARQL = 'https://query.wikidata.org/sparql';
const OVERPASS_API = 'https://overpass-api.de/api/interpreter';
const WIKIPEDIA_API = 'https://en.wikipedia.org/w/api.php';
const OPENALEX_API = 'https://api.openalex.org/institutions';

/**
 * SOURCE 1: Hipo API - Best for quick global coverage
 */
export const fetchFromHipoAPI = async (country) => {
    try {
        const response = await fetch(`${HIPO_API_BASE}?country=${encodeURIComponent(country)}`);
        if (!response.ok) throw new Error(`Hipo API error: ${response.status}`);
        const data = await response.json();
        
        return data.map(uni => ({
            name: uni.name,
            country: uni.country,
            domains: uni.domains || [],
            webPages: uni.web_pages || [],
            website: uni.web_pages?.[0] || null,
            source: 'hipolabs.com'
        }));
    } catch (error) {
        console.error(`Error fetching from Hipo API for ${country}:`, error.message);
        return [];
    }
};

/**
 * SOURCE 2: Wikidata SPARQL - Get detailed university information
 */
export const fetchFromWikidata = async (country = 'Q258') => {
    // Q258 = South Africa, customize for other countries
    try {
        const query = `
        SELECT ?university ?name ?website ?founded ?location WHERE {
          ?university wdt:P31 wd:Q3918.
          ?university wdt:P17 wd:${country}.
          ?university rdfs:label ?name.
          OPTIONAL { ?university wdt:P856 ?website. }
          OPTIONAL { ?university wdt:P571 ?founded. }
          OPTIONAL { ?university wdt:P131 ?location. }
          FILTER(LANG(?name) = "en")
        }
        LIMIT 500
        `;

        const url = `${WIKIDATA_SPARQL}?query=${encodeURIComponent(query)}&format=json`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`Wikidata error: ${response.status}`);
        const data = await response.json();

        return data.results?.bindings?.map(binding => ({
            name: binding.name?.value,
            website: binding.website?.value,
            founded: binding.founded?.value?.split('T')[0],
            location: binding.location?.value,
            source: 'wikidata.org'
        })) || [];
    } catch (error) {
        console.error('Error fetching from Wikidata:', error.message);
        return [];
    }
};

/**
 * SOURCE 3: OpenStreetMap Overpass API - Get universities with exact coordinates
 */
export const fetchFromOpenStreetMap = async (countryCode = 'ZA') => {
    try {
        const query = `
        [out:json][timeout:25];
        area["ISO3166-1"="${countryCode}"][admin_level=2];
        (
          node["amenity"="university"](area);
          way["amenity"="university"](area);
          rel["amenity"="university"](area)
        );
        out center;
        `;

        const response = await fetch(OVERPASS_API, {
            method: 'POST',
            body: query
        });

        if (!response.ok) throw new Error(`Overpass API error: ${response.status}`);
        const data = await response.json();

        return data.elements?.map(element => ({
            name: element.tags?.name,
            latitude: element.center?.lat || element.lat,
            longitude: element.center?.lon || element.lon,
            country: countryCode,
            source: 'openstreetmap.org'
        })) || [];
    } catch (error) {
        console.error('Error fetching from OpenStreetMap:', error.message);
        return [];
    }
};

/**
 * SOURCE 4: Wikipedia API - Get country-specific university lists
 */
export const fetchFromWikipedia = async (pageTitle = 'List_of_universities_in_South_Africa') => {
    try {
        const response = await fetch(
            `${WIKIPEDIA_API}?action=query&titles=${encodeURIComponent(pageTitle)}&prop=extracts&explaintext=true&format=json`
        );

        if (!response.ok) throw new Error(`Wikipedia API error: ${response.status}`);
        const data = await response.json();

        // Parse Wikipedia content to extract university names
        const pages = data.query.pages;
        const content = Object.values(pages)[0]?.extract || '';
        
        // Simple regex to find potential university names (starting with capital letters)
        const uniPattern = /([A-Z][^,\n]*(?:University|Institute|College|Academy)[^,\n]*)/g;
        const universities = content.match(uniPattern) || [];

        return [...new Set(universities)].slice(0, 100).map(name => ({
            name: name.trim(),
            source: 'wikipedia.org'
        }));
    } catch (error) {
        console.error('Error fetching from Wikipedia:', error.message);
        return [];
    }
};

/**
 * SOURCE 5: OpenAlex API - Academic institutions database (no key needed)
 */
export const fetchFromOpenAlex = async (countryName = 'South Africa') => {
    try {
        const response = await fetch(
            `${OPENALEX_API}?search=${encodeURIComponent(countryName)}&per_page=100&sort=display_name:asc`
        );

        if (!response.ok) throw new Error(`OpenAlex API error: ${response.status}`);
        const data = await response.json();

        return data.results?.map(institution => ({
            name: institution.display_name,
            country: institution.geo?.country_name,
            website: institution.homepage_url,
            type: institution.type,
            source: 'openalex.org'
        })) || [];
    } catch (error) {
        console.error('Error fetching from OpenAlex:', error.message);
        return [];
    }
};

/**
 * COMBINED: Get universities from multiple sources
 */
export const fetchUniversitiesByCountryMultiSource = async (country, countryCode = 'ZA') => {
    console.log(`🌍 Fetching universities for ${country} from multiple sources...`);

    try {
        // Fetch from all sources in parallel
        const [hipoResults, wikidataResults, osmResults, openalex] = await Promise.all([
            fetchFromHipoAPI(country),
            fetchFromWikidata(),
            fetchFromOpenStreetMap(countryCode),
            fetchFromOpenAlex(country)
        ]);

        // Merge and deduplicate by name
        const allUniversities = [...hipoResults, ...wikidataResults, ...osmResults, ...openalex];
        const uniqueMap = new Map();

        allUniversities.forEach(uni => {
            const key = uni.name?.toLowerCase();
            if (key && !uniqueMap.has(key)) {
                uniqueMap.set(key, uni);
            }
        });

        console.log(`✅ Found ${uniqueMap.size} unique universities from ${allUniversities.length} total results`);
        return Array.from(uniqueMap.values());
    } catch (error) {
        console.error('Error in multi-source fetch:', error);
        return [];
    }
};

/**
 * OLD FUNCTIONS (kept for backward compatibility)
 */
export const fetchUniversitiesByCountry = async (country) => {
    return fetchFromHipoAPI(country);
};

export const fetchUniversitiesByCountries = async (countries) => {
    try {
        const allUniversities = [];
        
        for (const country of countries) {
            const unis = await fetchUniversitiesByCountry(country);
            allUniversities.push(...unis);
        }
        
        return allUniversities;
    } catch (error) {
        console.error('Error fetching universities from multiple countries:', error);
        throw error;
    }
};

export const searchUniversitiesGlobal = async (query) => {
    try {
        const response = await fetch(`${HIPO_API_BASE}?name=${encodeURIComponent(query)}`);
        
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        return data.map(uni => ({
            name: uni.name,
            country: uni.country,
            domains: uni.domains || [],
            webPages: uni.web_pages || []
        }));
    } catch (error) {
        console.error('Error searching universities:', error);
        throw error;
    }
};

/**
 * Seed database with universities from API
 * @param {Array<string>} countries - Countries to fetch
 * @param {Model} UniversityModel - Mongoose University model
 */
export const seedUniversitiesFromAPI = async (countries, UniversityModel) => {
    try {
        console.log(`🌍 Seeding universities from multiple free sources...`);
        
        const universities = await fetchUniversitiesByCountries(countries);
        
        console.log(`📚 Found ${universities.length} universities`);
        
        // Check for duplicates and insert
        for (const uni of universities) {
            const exists = await UniversityModel.findOne({ 
                name: uni.name, 
                country: uni.country 
            });
            
            if (!exists) {
                await UniversityModel.create(uni);
            }
        }
        
        console.log('✅ Successfully seeded universities from API');
        return universities.length;
    } catch (error) {
        console.error('❌ Error seeding universities:', error.message);
        throw error;
    }
};
