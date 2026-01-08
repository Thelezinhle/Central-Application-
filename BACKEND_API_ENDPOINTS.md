# CAO Backend API Endpoints Reference

## 🔗 Backend Server
- **URL**: `http://localhost:5000`
- **Status**: Check with `http://localhost:5000/health` or test with API endpoint

---

## 📡 API Endpoints Available

### Authentication Endpoints
**Base URL:** `/api/auth`

```
POST   /api/auth/register
       Body: { firstName, lastName, email, phone, idNumber, password, confirmPassword }
       Returns: { user, token }

POST   /api/auth/login
       Body: { email, password }
       Returns: { user, token }

POST   /api/auth/logout
       Headers: { Authorization: Bearer token }
       Returns: { message }

GET    /api/auth/me
       Headers: { Authorization: Bearer token }
       Returns: { user }
```

---

### Course Endpoints
**Base URL:** `/api/courses`

```
GET    /api/courses
       Query: ?search=term&university=id&limit=10&page=1
       Returns: { courses: [], total, pages }

GET    /api/courses/:id
       Returns: { course }

POST   /api/courses
       Body: { name, code, university, description, requirements, capacity }
       Returns: { course }

PUT    /api/courses/:id
       Body: { fields to update }
       Returns: { course }

DELETE /api/courses/:id
       Returns: { message }
```

---

### University Endpoints
**Base URL:** `/api/universities`

```
GET    /api/universities
       Query: ?search=term&location=city&limit=10&page=1
       Returns: { universities: [], total, pages }

GET    /api/universities/:id
       Returns: { university, courses: [] }

POST   /api/universities
       Body: { name, location, contactEmail, contactPhone, website }
       Returns: { university }

PUT    /api/universities/:id
       Body: { fields to update }
       Returns: { university }

DELETE /api/universities/:id
       Returns: { message }
```

---

### Global Universities (RapidAPI)
**Base URL:** `/api/global-universities`

```
GET    /api/global-universities/countries
       Returns: { countries: [] }

GET    /api/global-universities/uni-rank
       Query: ?country=Ireland&limit=50
       Returns: { universities: [] }
```

---

### Application Endpoints
**Base URL:** `/api/applications`

```
GET    /api/applications
       Headers: { Authorization: Bearer token }
       Query: ?status=pending&limit=10&page=1
       Returns: { applications: [], total, pages }

GET    /api/applications/:id
       Headers: { Authorization: Bearer token }
       Returns: { application }

POST   /api/applications
       Headers: { Authorization: Bearer token }
       Body: { userId, courseId, applicationDate, documents: [] }
       Returns: { application }

PUT    /api/applications/:id
       Headers: { Authorization: Bearer token }
       Body: { status, withdrawnDate, etc }
       Returns: { application }

DELETE /api/applications/:id
       Headers: { Authorization: Bearer token }
       Returns: { message }
```

---

### Payment Endpoints
**Base URL:** `/api/payments`

```
POST   /api/payments/process
       Headers: { Authorization: Bearer token }
       Body: { applicationId, amount, method, cardDetails }
       Returns: { transaction }

GET    /api/payments/:id
       Headers: { Authorization: Bearer token }
       Returns: { payment }

GET    /api/payments
       Headers: { Authorization: Bearer token }
       Query: ?status=completed&limit=10
       Returns: { payments: [] }
```

---

### Document Upload Endpoints
**Base URL:** `/api/documents`

```
POST   /api/documents/upload
       Headers: { Authorization: Bearer token, Content-Type: multipart/form-data }
       Body: { file, applicationId }
       Returns: { document }

GET    /api/documents/:id
       Headers: { Authorization: Bearer token }
       Returns: { document }

DELETE /api/documents/:id
       Headers: { Authorization: Bearer token }
       Returns: { message }
```

---

### Admin Endpoints
**Base URL:** `/api/admin`

```
GET    /api/admin/users
       Headers: { Authorization: Bearer token (Admin) }
       Query: ?limit=20&page=1&role=user
       Returns: { users: [], total, pages }

GET    /api/admin/statistics
       Headers: { Authorization: Bearer token (Admin) }
       Returns: { stats: { totalUsers, totalApplications, totalCourses } }

PUT    /api/admin/users/:id
       Headers: { Authorization: Bearer token (Admin) }
       Body: { role, status, etc }
       Returns: { user }
```

---

## 🔐 Authentication

All protected endpoints require:
```
Headers: {
  "Authorization": "Bearer YOUR_JWT_TOKEN"
}
```

Get token by logging in:
```javascript
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```javascript
{
  "user": { "id", "email", "firstName", "role" },
  "token": "eyJhbGc..."
}
```

---

## 🧪 Test API Endpoints

### Using cURL
```bash
# Get all courses
curl http://localhost:5000/api/courses

# Get all universities
curl http://localhost:5000/api/universities

# Get global universities
curl http://localhost:5000/api/global-universities/countries

# Login (get token)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get user applications (with token)
curl http://localhost:5000/api/applications \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Using Postman
1. Create new request
2. Set method to GET/POST
3. Enter endpoint URL
4. For protected routes:
   - Go to "Authorization" tab
   - Select "Bearer Token"
   - Paste your token
5. Send request

---

## 📊 Response Format

### Success Response
```javascript
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation completed successfully"
}
```

### Error Response
```javascript
{
  "success": false,
  "error": "Error message",
  "code": 400
}
```

---

## ⚡ Rate Limiting

- No explicit rate limiting currently
- Each endpoint processes requests immediately
- Large data requests may take longer

---

## 🔄 Data Seeding

The backend has seed files to populate test data:

```bash
cd backend
node seed.js                              # Load basic seed
node seed-courses.js                      # Add courses
node seed-universities.js                 # Add universities
node seed-courses-comprehensive.js        # Add comprehensive course data
node seed-api.js                          # Seed from APIs
```

---

## ✅ Verify API is Working

```
GET http://localhost:5000/api/global-universities/countries

Expected: Array of country objects
```

Or using browser console:
```javascript
fetch('http://localhost:5000/api/global-universities/countries')
  .then(r => r.json())
  .then(d => console.log(d))
```

---

## 🚀 Using Endpoints with Voice Assistant

The voice assistant can trigger API calls through these commands:

```
"search for engineering" → GET /api/courses?search=engineering
"go to dashboard" → GET /api/applications (after login)
"apply for course" → POST /api/applications
"check deadline" → Returns deadline info
"get universities" → GET /api/universities
```

---

## 📝 Notes

- All timestamps are in ISO 8601 format
- IDs are MongoDB ObjectIds (24 character hex strings)
- Passwords are hashed with bcrypt
- Files uploaded go to `/uploads` directory
- JWT tokens expire after 7 days (configurable)

---

## 🔗 External APIs Used

### RapidAPI Integration
- **Global Universities Data**: RapidAPI universities endpoint
- **API Key needed**: Set in `.env` file as `RAPIDAPI_KEY`
- **Endpoint**: `/api/global-universities/uni-rank`

### Get RapidAPI Key:
1. Go to https://rapidapi.com
2. Search "universities" API
3. Subscribe to free tier
4. Copy API key
5. Add to backend `.env`:
   ```
   RAPIDAPI_KEY=your_key_here
   ```

---

## 💾 Database Models

### User
```javascript
{ email, firstName, lastName, phone, idNumber, password, role, createdAt, updatedAt }
```

### Course
```javascript
{ code, name, university, requirements, capacity, description, createdAt, updatedAt }
```

### University
```javascript
{ name, location, contactEmail, contactPhone, website, createdAt, updatedAt }
```

### Application
```javascript
{ userId, courseId, applicationDate, status, documents, createdAt, updatedAt }
```

### Payment
```javascript
{ userId, applicationId, amount, method, status, transactionId, createdAt, updatedAt }
```

---

