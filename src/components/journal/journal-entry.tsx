import React from 'react';
import type { JournalEntry as JournalEntryType } from '../../types';

interface JournalEntryProps {
    entry: JournalEntryType;
    onClick: (entry: JournalEntryType) => void;
}

export const JournalEntry: React.FC<JournalEntryProps> = ({ entry, onClick }) => (
    <div 
        className="w-full h-full rounded-lg overflow-hidden cursor-pointer hover:scale-105 transform transition-all duration-200 shadow-sm"
        onClick={() => onClick(entry)}
    >
        <img 
        src={entry.imgUrl} 
        alt=""
        className="w-full h-full object-cover"
        loading="lazy"
        onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="%23e5e7eb"/><circle cx="12" cy="12" r="3" fill="%23a1a1aa"/></svg>';
        }}
        />
    </div>
);