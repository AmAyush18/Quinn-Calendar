import React from 'react';
import type { VirtualizedMonthData, EntriesByDate, JournalEntry } from '../../types';
import { DateUtils } from '../../utils';
import { CalendarDay } from './calendar-day';

interface VirtualizedMonthProps {
    monthData: VirtualizedMonthData;
    entriesByDate: EntriesByDate;
    onEntryClick: (entry: JournalEntry) => void;
    style: React.CSSProperties;
}

export const VirtualizedMonth: React.FC<VirtualizedMonthProps> = ({
    monthData,
    entriesByDate,
    onEntryClick,
    style
}) => {
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    return (
        <div style={style} className="bg-stone-100 rounded-lg md:rounded-2xl shadow-2xl border-2 border-stone-300 mx-8 overflow-hidden">
            <div className="bg-emerald-700 p-2 md:p-4">
                <h3 className="font-black text-white text-lg md:text-2xl tracking-wider drop-shadow-md">
                    {DateUtils.formatDate(monthData.monthDate, 'MMMM yyyy')}
                </h3>
            </div>
            
            <div className="grid grid-cols-7 bg-stone-200">
                {weekDays.map((day, index) => (
                    <div 
                        key={index} 
                        className="p-2 text-center text-sm md:text-base text-semibold md:font-bold text-stone-700 border-r-2 border-stone-300 last:border-r-0"
                    >
                        <div className="hidden md:block">{day}</div>
                        <div className="md:hidden font-extrabold">{day.substring(0, 3)}</div>
                    </div>
                ))}
            </div>
            
            <div className="grid grid-cols-7 bg-stone-100 p-2 md:p-4 gap-3">
                {monthData.days.map((day, index) => {
                    const entries = entriesByDate[day.dateKey] || [];
                    return (
                        <CalendarDay 
                            key={`${day.dateKey}-${index}`}
                            day={day} 
                            entries={entries}
                            onEntryClick={onEntryClick}
                        />
                    );
                })}
            </div>
        </div>
    );
};
