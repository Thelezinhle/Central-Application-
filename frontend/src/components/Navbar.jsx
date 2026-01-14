import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import useAuthStore from '../context/authStore';

function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const { user, logout } = useAuthStore();

    return (
        <nav className="bg-white shadow-md">
            <div className="container flex justify-between items-center py-4">
                <Link to="/" className="text-2xl font-bold text-green-700">
                    ICA Global
                </Link>

                <div className="hidden md:flex space-x-6">
                    <Link to="/universities" className="text-gray-700 hover:text-green-700">Universities</Link>
                    <Link to="/colleges" className="text-gray-700 hover:text-green-700">Colleges</Link>
                    <Link to="/cao-programmes" className="text-gray-700 hover:text-green-700 font-semibold text-green-600">CAO Handbook</Link>
                    <Link to="/recommendations" className="text-gray-700 hover:text-green-700">Recommendations</Link>
                    <Link to="/track-status" className="text-gray-700 hover:text-green-700">Track Status</Link>
                    {user && <Link to="/dashboard" className="text-gray-700 hover:text-green-700">Dashboard</Link>}
                    {user?.role === 'admin' && <Link to="/admin" className="text-gray-700 hover:text-green-700">Admin</Link>}
                </div>

                <div className="hidden md:flex space-x-4">
                    {user ? (
                        <>
                            <span className="text-gray-700">{user.firstName}</span>
                            <button onClick={logout} className="btn-secondary">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn-secondary">Login</Link>
                            <Link to="/register" className="btn-primary">Register</Link>
                        </>
                    )}
                </div>

                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {isOpen && (
                <div className="md:hidden bg-gray-100 p-4">
                    <Link to="/universities" className="block py-2">Universities</Link>
                    <Link to="/colleges" className="block py-2">Colleges</Link>
                    <Link to="/cao-programmes" className="block py-2 font-semibold text-green-600">CAO Handbook</Link>
                    <Link to="/recommendations" className="block py-2">Recommendations</Link>
                    <Link to="/track-status" className="block py-2">Track Status</Link>
                    {user && <Link to="/dashboard" className="block py-2">Dashboard</Link>}
                    {user?.role === 'admin' && <Link to="/admin" className="block py-2">Admin</Link>}
                    {user ? (
                        <button onClick={logout} className="btn-secondary w-full mt-2">Logout</button>
                    ) : (
                        <>
                            <Link to="/login" className="btn-secondary block w-full text-center mb-2">Login</Link>
                            <Link to="/register" className="btn-primary block w-full text-center">Register</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}

export default Navbar;
