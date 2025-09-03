import React, { useState } from 'react';
import type { JournalEntry } from '../../types';
import { StarRating } from '../common/star-rating';

interface JournalModalProps {
    entry: JournalEntry;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
    hasPrev: boolean;
    hasNext: boolean;
}

export const JournalModal: React.FC<JournalModalProps> = ({ 
    entry, 
    onClose, 
    onPrev, 
    onNext, 
    hasPrev, 
    hasNext 
}) => {
    const [touchStart, setTouchStart] = useState<number | null>(null);

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!touchStart) return;
        
        const touchEnd = e.changedTouches[0].clientX;
        const diff = touchStart - touchEnd;
        
        if (Math.abs(diff) > 50) {
        if (diff > 0 && hasNext) onNext();
        else if (diff < 0 && hasPrev) onPrev();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div 
            className="bg-white rounded-2xl max-w-sm w-full max-h-[90vh] overflow-hidden shadow-2xl"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className="relative">
            <img 
                src={entry.imgUrl} 
                alt=""
                className="w-full h-80 sm:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center text-xl hover:bg-black/70 transition-all duration-200"
            >
                ×
            </button>
            
            {hasPrev && (
                <button 
                onClick={onPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition-all duration-200 text-xl"
                >
                ‹
                </button>
            )}
            
            {hasNext && (
                <button 
                onClick={onNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition-all duration-200 text-xl"
                >
                ›
                </button>
            )}
            </div>
            
            <div className="p-6">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                <StarRating rating={entry.rating} />
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">DC</span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">W</span>
                </div>
                <span className="text-sm text-gray-600 font-medium">{entry.date}</span>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="text-gray-800 text-sm leading-relaxed">{entry.description}</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                {entry.categories.slice(0, 3).map((cat, i) => (
                <span 
                    key={i} 
                    className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                >
                    {cat}
                </span>
                ))}
            </div>
            
            <div className="flex justify-center mt-4 gap-2">
                <div className={`w-2 h-2 rounded-full ${hasPrev ? 'bg-gray-400' : 'bg-gray-300'}`}></div>
                <div className="w-3 h-2 rounded-full bg-blue-500"></div>
                <div className={`w-2 h-2 rounded-full ${hasNext ? 'bg-gray-400' : 'bg-gray-300'}`}></div>
            </div>
            </div>
        </div>
        </div>
    );
};