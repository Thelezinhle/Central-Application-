import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <nav className="bg-white shadow-md">
            <div className="container flex justify-between items-center py-4">
                <Link to="/" className="flex items-center gap-3 -ml-4">
                    <img 
                        src="/images/icons/global-education.png" 
                        alt="CAO Logo"
                        className="h-14 w-14"
                    />
                    <span className="text-2xl font-bold text-green-700">CAO South Africa</span>
                </Link>

                <div className="hidden md:flex space-x-6">
                    <Link to="/universities" className="text-gray-900 font-bold hover:text-green-700 text-base">Universities</Link>
                    <Link to="/colleges" className="text-gray-900 font-bold hover:text-green-700 text-base">Colleges</Link>
                    <Link to="/cao-programmes" className="text-black font-bold hover:text-green-700 text-base">CAO Handbook</Link>
                    <Link to="/bursaries" className="text-gray-900 font-bold hover:text-green-700 text-base">Bursaries</Link>
                    <Link to="/recommendations" className="text-gray-900 font-bold hover:text-green-700 text-base">Recommendations</Link>
                    <Link to="/track-status" className="text-gray-900 font-bold hover:text-green-700 text-base">Track Status</Link>
                </div>

                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {isOpen && (
                <div className="md:hidden bg-gray-100 p-4">
                    <Link to="/universities" className="block py-2 font-bold text-gray-900">Universities</Link>
                    <Link to="/colleges" className="block py-2 font-bold text-gray-900">Colleges</Link>
                    <Link to="/cao-programmes" className="block py-2 font-bold text-green-700">CAO Handbook</Link>
                    <Link to="/bursaries" className="block py-2 font-bold text-gray-900">Bursaries</Link>
                    <Link to="/recommendations" className="block py-2 font-bold text-gray-900">Recommendations</Link>
                    <Link to="/track-status" className="block py-2 font-bold text-gray-900">Track Status</Link>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
