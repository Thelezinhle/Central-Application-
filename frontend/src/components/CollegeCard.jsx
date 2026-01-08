import React, { useState } from 'react';
import { Heart, Share2, BarChart3, MapPin, Globe } from 'lucide-react';

function CollegeCard({ college, onViewDetails, isFavorite, onToggleFavorite, onCompare }) {
    const [isSharing, setIsSharing] = useState(false);

    const handleShare = () => {
        const text = `Check out ${college.name} - ${college.location}. ${college.website}`;
        if (navigator.share) {
            navigator.share({
                title: college.name,
                text: text,
                url: college.website
            });
        } else {
            navigator.clipboard.writeText(text);
            setIsSharing(true);
            setTimeout(() => setIsSharing(false), 2000);
        }
    };

    // Handle different data structures
    const city = college.city || college.address?.city;
    const locationCode = college.location?.substring(0, 2).toUpperCase() || 'ZA';
    const website = college.website || college.web_pages?.[0];

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border-l-4 border-[#228B22]">
            <div className="p-6">
                {/* College Name */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {college.name}
                </h3>

                {/* Location */}
                {city && (
                    <div className="flex items-center gap-2 text-[#8B7355] mb-4">
                        <MapPin size={18} className="flex-shrink-0" />
                        <span className="font-medium">{city}, {locationCode}</span>
                    </div>
                )}

                {/* Type/Category Badge */}
                {(college.type || college.category) && (
                    <div className="text-sm text-gray-600 mb-4 capitalize">
                        {college.type || college.category}
                    </div>
                )}

                {/* Website Button */}
                {website && (
                    <div className="flex gap-2 mt-6">
                        <a
                            href={website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-6 py-2 border-2 border-gray-900 text-gray-900 font-semibold hover:bg-gray-900 hover:text-white transition-colors text-center"
                        >
                            Visit Website
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CollegeCard;
