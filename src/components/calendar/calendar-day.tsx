import React from 'react';
import type { DayData, JournalEntry as JournalEntryType } from '../../types';
import { DateUtils } from '../../utils';

interface CalendarDayProps {
    day: DayData;
    entries: JournalEntryType[];
    onEntryClick: (entry: JournalEntryType) => void;
}

export const CalendarDay: React.FC<CalendarDayProps> = ({ day, entries, onEntryClick }) => {
    const isToday = DateUtils.isSameDay(day.date, new Date());
    const hasEntries = entries.length > 0;
    
    const mainEntry = entries[0];
    
    return (
        <div 
            className={`relative h-14 border-2 cursor-pointer transition-all duration-300 group rounded-xl overflow-hidden ${
                !day.isCurrentMonth 
                    ? 'bg-stone-100 opacity-50 border-stone-200' 
                    : hasEntries
                        ? 'hover:scale-105 hover:shadow-2xl hover:z-10 border-emerald-700'
                        : 'bg-stone-50 hover:bg-stone-100 border-stone-300'
            }`}
            onClick={() => hasEntries && onEntryClick(mainEntry)}
        >
            {hasEntries && day.isCurrentMonth && (
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ 
                        backgroundImage: `url(${mainEntry.imgUrl})`,
                    }}
                >
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300"></div>
                </div>
            )}
            
            <div className={`absolute top-3 left-3 z-10 font-bold ${
                isToday 
                    ? 'bg-emerald-700 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-lg border-2 border-white' 
                    : hasEntries && day.isCurrentMonth
                        ? 'text-white drop-shadow-2xl text-lg bg-black/30 w-8 h-8 rounded-full flex items-center justify-center'
                        : day.isCurrentMonth
                            ? 'text-stone-700 text-lg'
                            : 'text-stone-400 text-lg'
            }`}>
                {DateUtils.formatDate(day.date, 'd')}
            </div>
            
            {entries.length > 1 && day.isCurrentMonth && (
                <div className="absolute top-3 right-3 z-10">
                    <div className="bg-emerald-700 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shadow-lg border-2 border-white">
                        {entries.length}
                    </div>
                </div>
            )}
            
            {hasEntries && day.isCurrentMonth && (
                <div className="absolute bottom-3 right-3 z-10">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg border border-stone-200">
                        <div className="flex items-center gap-1">
                            <span className="text-yellow-600 text-sm">★</span>
                            <span className="text-stone-800 text-sm font-bold">
                                {mainEntry.rating}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
