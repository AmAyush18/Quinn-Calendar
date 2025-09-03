import React from 'react';

interface StarRatingProps {
    rating: number;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
        stars.push(<span key={i} className="text-yellow-500 text-sm">★</span>);
        } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} className="text-yellow-400 text-sm">☆</span>);
        } else {
        stars.push(<span key={i} className="text-gray-300 text-sm">☆</span>);
        }
    }
    return <div className="flex items-center gap-0.5">{stars}</div>;
};