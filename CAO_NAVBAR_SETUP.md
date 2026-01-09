# 📌 How to Add CAO Link to Navigation

If you want to add a link to the CAO Programmes page in your navbar, follow these steps:

## Find Your Navbar Component

Typically located at: `frontend/src/components/Navbar.jsx`

## Add the Link

Find the navigation links section and add:

```jsx
<Link to="/cao-programmes" className="nav-link">
    📚 CAO Programmes
</Link>
```

Or with an icon (if using react-icons):

```jsx
import { FaBook } from 'react-icons/fa';

// In your navbar JSX:
<Link to="/cao-programmes" className="nav-link">
    <FaBook /> CAO Programmes
</Link>
```

## Example Integration

In your navbar menu structure, add alongside other course/university links:

```jsx
<nav className="navbar">
    <Link to="/">Home</Link>
    <Link to="/universities">Universities</Link>
    <Link to="/courses">All Courses</Link>
    <Link to="/cao-programmes">CAO Programmes</Link>  {/* Add this */}
    <Link to="/aps-calculator">APS Calculator</Link>
    <Link to="/recommendations">Recommendations</Link>
    {user && <Link to="/dashboard">Dashboard</Link>}
</nav>
```

## Optional: Add a Badge

Show the number of CAO programmes available:

```jsx
const [caoCount, setCaoCount] = useState(0);

useEffect(() => {
    // Fetch count of CAO programmes
    axios.get('http://localhost:5000/api/courses?hasCAO=true&limit=1')
        .then(res => setCaoCount(res.data.total))
        .catch(console.error);
}, []);

// In JSX:
<Link to="/cao-programmes" className="nav-link">
    📚 CAO Programmes 
    <span className="badge">{caoCount}</span>
</Link>
```

## Styling (Optional)

Add to your navbar CSS:

```css
.badge {
    background: #667eea;
    color: white;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 0.8rem;
    margin-left: 5px;
    font-weight: bold;
}
```

That's it! Your users can now easily access CAO Programmes from the navbar.
