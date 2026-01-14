# CAO Course Code Explainer - Integration Guide

## Overview
This guide helps first-time users understand what CAO course codes mean. We've created three main components:

1. **Backend Data** - Code reference database and decoder logic
2. **Frontend Utilities** - Helper functions to decode and explain codes
3. **React Components** - Pre-built UI components for displaying explanations

---

## File Locations

### Backend Files
- `/backend/src/data/codeReference.js` - Complete code reference guide with decoder function

### Frontend Files
- `/frontend/src/utils/codeDecoder.js` - Code decoder utility class
- `/frontend/src/components/CourseCodeExplainer.jsx` - React components for UI
- `/frontend/src/components/CourseCodeExplainer.css` - Styling

---

## How to Use in Your Components

### 1. Simple Code Explanation (Inline)

```jsx
import { CourseCodeExplainer } from '@/components/CourseCodeExplainer';

export function CourseCard({ code, name }) {
    return (
        <div className="course-card">
            <h3>{name}</h3>
            {/* Shows: "ZU | M | BAS" with simple explanation */}
            <CourseCodeExplainer courseCode={code} variant="inline" />
        </div>
    );
}
```

### 2. Expandable Details

```jsx
import { CourseCodeExplainer } from '@/components/CourseCodeExplainer';

export function CourseList() {
    return (
        <div className="course-list">
            {courses.map(course => (
                <CourseCodeExplainer 
                    key={course.id} 
                    courseCode={course.code} 
                    variant="expandable" 
                />
            ))}
        </div>
    );
}
```

### 3. Tooltip (Hover to See Explanation)

```jsx
import { CourseCodeExplainer } from '@/components/CourseCodeExplainer';

export function CourseTable() {
    return (
        <table>
            <tbody>
                {courses.map(course => (
                    <tr key={course.id}>
                        <td>
                            <CourseCodeExplainer 
                                courseCode={course.code} 
                                variant="tooltip" 
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
```

### 4. Show Code Legend (Help Section)

```jsx
import { CourseCodeLegend, QuickCodeTip } from '@/components/CourseCodeExplainer';

export function HelpPage() {
    return (
        <div className="help-section">
            <QuickCodeTip /> {/* Dismissible tip for new users */}
            <CourseCodeLegend /> {/* Full interactive guide */}
        </div>
    );
}
```

---

## Using the Decoder Utility

```jsx
import CodeDecoder from '@/utils/codeDecoder';

// Get simple explanation
const explanation = CodeDecoder.explain("ZU-M-BAS");
// Returns: "Master's in Business Accounting from Zululand University"

// Get detailed breakdown
const details = CodeDecoder.decode("ZU-M-BAS");
// Returns object with: institution, level, program, duration, etc.

// Get category color for UI
const color = CodeDecoder.getColor("ZU");
// Returns: "#4A90E2" (blue for public university)

// Check if code format is valid
if (CodeDecoder.isValid("ZU-M-BAS")) {
    // Safe to use
}

// Get suggested FAQ questions about a code
const questions = CodeDecoder.getQuestions("ZU-M-BAS");
```

---

## Display Examples

### Example 1: Course Listing Page
Show code explanation inline with each course

```jsx
<div className="course-list">
    {courses.map(course => (
        <div key={course.id} className="course-item">
            <h4>{course.name}</h4>
            <CourseCodeExplainer courseCode={course.code} variant="inline" />
            <p>{course.description}</p>
        </div>
    ))}
</div>
```

**Displays as:**
```
Course Name
ZU | M | BAS
Master's in Business Accounting from Zululand University

Course description...
```

### Example 2: Filter/Search Results
Show expandable codes so users can learn while browsing

```jsx
<div className="search-results">
    {results.map(result => (
        <CourseCodeExplainer 
            key={result.id}
            courseCode={result.code}
            variant="expandable"
        />
    ))}
</div>
```

**Displays as:**
```
[ZU-M-BAS] ▶
[Click to expand and see details]

[KN-P-BCN] ▶
[Click to expand and see details]
```

### Example 3: Comparison Table
Use tooltips to save space

```jsx
<table className="comparison">
    <thead>
        <tr>
            <th>Code</th>
            <th>Program</th>
            <th>Duration</th>
        </tr>
    </thead>
    <tbody>
        {courses.map(course => (
            <tr key={course.id}>
                <td>
                    <CourseCodeExplainer 
                        courseCode={course.code}
                        variant="tooltip"
                    />
                </td>
                <td>{course.name}</td>
                <td>{course.duration}</td>
            </tr>
        ))}
    </tbody>
</table>
```

**Displays as:**
```
Code        Program                  Duration
ZU-M-BAS*   Master's in Accounting  2 years
* Hover to see full explanation
```

---

## Customization

### Change Color Scheme
Edit `CourseCodeExplainer.css`:
```css
.code-expand-btn {
    background: #your-color;
}

.code-badge {
    background: #your-university-color;
}
```

### Add More Universities
Edit `backend/src/data/codeReference.js`:
```javascript
universityPrefixes: {
    "NEW": {
        fullName: "New University Name",
        location: "Location",
        type: "Public University"
    },
    // ... more universities
}
```

### Translate to Other Languages
Create language files:
```javascript
// codeReference.es.js (Spanish)
export const explanations = {
    "ZU-M-BAS": "Maestría en Contabilidad Empresarial..."
}
```

---

## Features

✅ **Beginner-Friendly** - Explains codes in plain language  
✅ **Multiple Display Options** - Inline, expandable, tooltip  
✅ **Interactive Legend** - Tabbed guide with examples  
✅ **Responsive Design** - Works on mobile and desktop  
✅ **Accessible** - Full keyboard navigation and screen reader support  
✅ **Dark Mode Support** - Automatic theme switching  
✅ **Customizable** - Easy to adapt to your design  
✅ **No Dependencies** - Uses pure React and CSS  

---

## Tips for Best UX

1. **Show legend on first visit** - Display `<QuickCodeTip />` to educate new users
2. **Use expandable variant in lists** - Let users learn at their own pace
3. **Use tooltips in tables** - Save space while still explaining codes
4. **Highlight on hover** - Make codes interactive and engaging
5. **Add help button** - Link to `<CourseCodeLegend />` for detailed reference
6. **Explain context** - Show which university/level each code belongs to

---

## Testing

Test with different code formats:
```javascript
// Should work:
CodeDecoder.decode("ZU-M-BAS")  // University-Level-Program
CodeDecoder.decode("N3-ELEC")   // TVET-Program
CodeDecoder.decode("DIP-IT")    // Level-Program

// Should show error:
CodeDecoder.decode("INVALID")   // No dashes
CodeDecoder.decode("ABC-123")   // Invalid format
```

---

## Support

For questions or issues:
1. Check the comments in `codeReference.js`
2. Review examples in `CourseCodeExplainer.jsx`
3. Test the decoder in `codeDecoder.js`
4. Refer to `CourseCodeExplainer.css` for styling customization

---

## Summary

| Component | Purpose | Best For |
|-----------|---------|----------|
| `CourseCodeExplainer` (inline) | Quick explanation | Course listings |
| `CourseCodeExplainer` (expandable) | Full details on demand | Search results |
| `CourseCodeExplainer` (tooltip) | Hover explanation | Tables, compact views |
| `CourseCodeLegend` | Educational guide | Help pages, onboarding |
| `QuickCodeTip` | New user notice | First-time visitors |
| `CodeDecoder` utility | Programmatic access | Custom components |

That's it! Your users will now understand course codes at a glance. 🎓
