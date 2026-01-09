# 🔌 CAO API Documentation

## Overview

The CAO integration adds CAO programme data to your existing course API. All endpoints return course objects with embedded CAO information.

---

## Base URL

```
http://localhost:5000/api/courses
```

---

## Endpoints

### Get All CAO Programmes

```http
GET /api/courses?hasCAO=true&limit=5000&page=1
```

**Query Parameters:**
- `hasCAO=true` (required) - Filter to only CAO programmes
- `limit` (optional) - Records per page (default: 100, max: 5000)
- `page` (optional) - Page number (default: 1)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "code": "BCMM101",
      "name": "Bachelor of Commerce in Management",
      "university": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "University of KwaZulu-Natal",
        "shortName": "UKZN",
        "country": "South Africa",
        "province": "KwaZulu-Natal"
      },
      "cao": {
        "programmeCode": "BCMM101",
        "institution": "UKZN",
        "handbookPage": 45,
        "source": "cao_handbook_2026",
        "verified": false
      },
      "description": "Bachelor of Commerce in Management at University of KwaZulu-Natal. CAO Programme Code: BCMM101",
      "level": "Bachelor",
      "isActive": true,
      "createdAt": "2026-01-08T10:30:00.000Z",
      "updatedAt": "2026-01-08T10:30:00.000Z"
    },
    // ... more programmes
  ],
  "total": 1070,
  "page": 1,
  "limit": 5000
}
```

**Example Usage:**
```javascript
// Fetch all CAO programmes
const response = await fetch('http://localhost:5000/api/courses?hasCAO=true&limit=5000');
const data = await response.json();
console.log(`Total programmes: ${data.total}`);
```

---

### Get Specific Institution's Programmes

```http
GET /api/courses?hasCAO=true&institution=UKZN
```

**Note:** Filter by institution name after fetching, as there's no direct institution filter in the API.

```javascript
// Client-side filtering example
const response = await fetch('http://localhost:5000/api/courses?hasCAO=true&limit=5000');
const data = await response.json();
const ukznProgrammes = data.data.filter(p => p.cao.institution === 'UKZN');
console.log(`UKZN programmes: ${ukznProgrammes.length}`);
```

---

### Get Institution Summary

```javascript
// Client-side aggregation
const response = await fetch('http://localhost:5000/api/courses?hasCAO=true&limit=5000');
const data = await response.json();

const summary = {};
data.data.forEach(programme => {
  const institution = programme.cao.institution;
  summary[institution] = (summary[institution] || 0) + 1;
});

Object.entries(summary)
  .sort((a, b) => b[1] - a[1])
  .forEach(([inst, count]) => {
    console.log(`${inst}: ${count}`);
  });
```

**Expected Output:**
```
UKZN: 150
DUT: 120
MUT: 100
UNIZULU: 85
...
```

---

## Response Fields

### Course Object

```json
{
  "_id": "MongoDB ObjectId",
  "code": "Programme code (may differ from cao.programmeCode)",
  "name": "Programme name",
  "university": {
    "_id": "MongoDB ObjectId",
    "name": "Full university name",
    "shortName": "Short code",
    "country": "South Africa",
    "province": "Province name"
  },
  "cao": {
    "programmeCode": "Official CAO code (e.g., BCMM101)",
    "institution": "Institution name (e.g., UKZN)",
    "handbookPage": "Page number in CAO Handbook",
    "source": "cao_handbook_2026 (data source)",
    "verified": "Boolean - admin verification status"
  },
  "description": "Programme description",
  "level": "Degree level (Bachelor, Masters, etc.)",
  "faculty": "Faculty name (if available)",
  "department": "Department name (if available)",
  "isActive": "Boolean - active status",
  "createdAt": "ISO timestamp",
  "updatedAt": "ISO timestamp"
}
```

---

## CAO Field Details

### cao.programmeCode
- **Type:** String
- **Format:** Letters + Numbers + Optional Letter (e.g., "BCMM101")
- **Example:** "BCMM101", "BCOM101", "BENG201"
- **Usage:** Official CAO code for looking up in CAO Handbook

### cao.institution
- **Type:** String
- **Format:** Institution short code (e.g., "UKZN")
- **Valid Values:** See list below
- **Usage:** Filter programmes by institution

### cao.handbookPage
- **Type:** Number
- **Range:** 45-211 (CAO Handbook pages)
- **Usage:** Reference to official CAO Handbook
- **Can be null** if page unknown

### cao.source
- **Type:** String
- **Current Value:** "cao_handbook_2026"
- **Usage:** Track data version for future updates

### cao.verified
- **Type:** Boolean
- **Default:** false
- **Usage:** Admin can mark programmes as verified/reviewed
- **Allows filtering** verified vs unverified data

---

## Valid Institution Values

### KwaZulu-Natal (4)
- `UKZN` - University of KwaZulu-Natal
- `DUT` - Durban University of Technology
- `MUT` - Mangosuthu University of Technology
- `UNIZULU` - University of Zululand

### Gauteng (7)
- `UP` - University of Pretoria
- `UJ` - University of Johannesburg
- `WITS` - University of the Witwatersrand
- `UNISA` - University of South Africa
- `TUT` - Tshwane University of Technology
- `UV` - Vaal University of Technology
- `SMU` - Sefako Makgatho Health Sciences University

### Western Cape (3)
- `UCT` - University of Cape Town
- `SU` - Stellenbosch University
- `UWC` - University of the Western Cape

### Eastern Cape (3)
- `UFH` - University of Fort Hare
- `NMU` - Nelson Mandela University
- `WSU` - Walter Sisulu University

### Other
- `UNIVEN` - University of Venda (Limpopo)
- `CUT` - Central University of Technology (Free State)
- `NWUTSA` - Northwest University (North West)
- `CIDP` - Construct IT Development Partnership

---

## Code Examples

### JavaScript/Fetch

```javascript
// Get all CAO programmes
async function getCAOProgrammes() {
  try {
    const response = await fetch(
      'http://localhost:5000/api/courses?hasCAO=true&limit=5000'
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching programmes:', error);
  }
}

// Get programmes by institution
async function getProgrammesByInstitution(institutionCode) {
  const programmes = await getCAOProgrammes();
  return programmes.filter(p => p.cao.institution === institutionCode);
}

// Search programmes
async function searchProgrammes(query) {
  const programmes = await getCAOProgrammes();
  const lower = query.toLowerCase();
  return programmes.filter(p =>
    p.cao.programmeCode.toLowerCase().includes(lower) ||
    p.name.toLowerCase().includes(lower) ||
    p.cao.institution.toLowerCase().includes(lower)
  );
}

// Get institution statistics
async function getInstitutionStats() {
  const programmes = await getCAOProgrammes();
  const stats = {};
  
  programmes.forEach(p => {
    const inst = p.cao.institution;
    stats[inst] = (stats[inst] || 0) + 1;
  });
  
  return Object.entries(stats)
    .sort((a, b) => b[1] - a[1])
    .map(([institution, count]) => ({ institution, count }));
}

// Example usage
getCAOProgrammes().then(programmes => {
  console.log(`Loaded ${programmes.length} programmes`);
  console.log('First programme:', programmes[0]);
});

searchProgrammes('BCMM').then(results => {
  console.log(`Found ${results.length} programmes matching "BCMM"`);
});

getInstitutionStats().then(stats => {
  stats.forEach(stat => {
    console.log(`${stat.institution}: ${stat.count}`);
  });
});
```

### React/Axios

```javascript
import axios from 'axios';
import { useState, useEffect } from 'react';

function CAOProgrammes() {
  const [programmes, setProgrammes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInstitution, setSelectedInstitution] = useState('all');

  useEffect(() => {
    fetchProgrammes();
  }, []);

  const fetchProgrammes = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/courses?hasCAO=true&limit=5000'
      );
      setProgrammes(response.data.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProgrammes = selectedInstitution === 'all'
    ? programmes
    : programmes.filter(p => p.cao.institution === selectedInstitution);

  return (
    <div>
      <h1>CAO Programmes ({filteredProgrammes.length})</h1>
      
      <select value={selectedInstitution} onChange={e => setSelectedInstitution(e.target.value)}>
        <option value="all">All Institutions</option>
        {[...new Set(programmes.map(p => p.cao.institution))].map(inst => (
          <option key={inst} value={inst}>{inst}</option>
        ))}
      </select>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {filteredProgrammes.map(p => (
            <li key={p._id}>
              <code>{p.cao.programmeCode}</code> - {p.name} ({p.cao.institution})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CAOProgrammes;
```

### Python

```python
import requests
import pandas as pd

# Get all CAO programmes
def get_cao_programmes():
    url = 'http://localhost:5000/api/courses?hasCAO=true&limit=5000'
    response = requests.get(url)
    return response.json()['data']

# Convert to DataFrame
programmes = get_cao_programmes()
df = pd.DataFrame(programmes)

# Extract CAO data
cao_df = pd.json_normalize(programmes, sep='_')

# Filter by institution
ukzn_programmes = [p for p in programmes if p['cao']['institution'] == 'UKZN']
print(f"UKZN programmes: {len(ukzn_programmes)}")

# Get institution summary
from collections import Counter
institutions = [p['cao']['institution'] for p in programmes]
summary = Counter(institutions)
for inst, count in summary.most_common():
    print(f"{inst}: {count}")

# Export to CSV
programmes_data = [
    {
        'code': p['cao']['programmeCode'],
        'name': p['name'],
        'institution': p['cao']['institution'],
        'page': p['cao']['handbookPage'],
        'verified': p['cao']['verified']
    }
    for p in programmes
]

df = pd.DataFrame(programmes_data)
df.to_csv('cao_programmes.csv', index=False)
print("Exported to cao_programmes.csv")
```

---

## Error Responses

### 500 Server Error
```json
{
  "success": false,
  "error": "Error message"
}
```

**Possible causes:**
- MongoDB connection lost
- Server error in processing
- Invalid query parameters

**Solution:** Check server logs, verify MongoDB is running

---

## Rate Limiting

No rate limiting is currently implemented. But for production:
- Implement caching for frequently accessed data
- Add pagination (limit results to 100 by default)
- Consider database indexing on `cao.programmeCode` and `cao.institution`

---

## Performance Tips

1. **Cache results client-side**
   ```javascript
   const [cache, setCache] = useState({});
   
   const getCached = async () => {
     if (cache.programmes) return cache.programmes;
     const programmes = await getCAOProgrammes();
     setCache({ programmes });
     return programmes;
   };
   ```

2. **Use pagination**
   - Request 1000 records per page instead of all 5000
   - Implement lazy loading

3. **Filter client-side**
   - Fetch all data once
   - Filter in JavaScript for search/institution filters

4. **Index the database**
   - Add index on `cao.programmeCode`
   - Add index on `cao.institution`

---

## Future Enhancements

Possible API additions:
- `GET /api/courses/:id` - Get single programme details
- `GET /api/institutions` - Get institution list with counts
- `GET /api/statistics` - Get CAO statistics
- `POST /api/courses/bulk` - Bulk import CAO updates
- Filtering: `?institution=UKZN&verified=true`

---

## Support

For API issues:
1. Check MongoDB is running
2. Verify backend is on port 5000
3. Check CORS is not blocking requests
4. Review browser console for errors
5. Check server logs: `npm run dev`

---

**API Documentation v1.0 - CAO Handbook 2026**
