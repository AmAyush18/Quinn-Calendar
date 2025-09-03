import React from 'react';
import { DateUtils } from '../../utils';

interface HeaderProps {
    currentMonth: Date;
}

export const Header: React.FC<HeaderProps> = ({ currentMonth }) => {
    return (
        <div className="bg-stone-800 shadow-2xl border-b-4 border-emerald-700 px-10 py-5 sticky top-0 z-20">
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-1 md:gap-4">
                    <div className="md:w-12 md:h-12 w-10 h-10 bg-emerald-700 rounded-2xl flex items-center justify-center shadow-lg border-2 border-emerald-600">
                        <span className="text-lg md:text-2xl">📅</span>
                    </div>
                    <h1 className="hidden md:block text-xl md:text-3xl font-black text-white tracking-wider drop-shadow-md">
                        Quinn Calendar
                    </h1>
                    <h1 className="md:hidden text-xl md:text-3xl font-black text-white tracking-wider drop-shadow-md">
                        QC
                    </h1>
                </div>
                
                <div className="flex-1"></div>
                
                <div className="flex items-center gap-6">
                    <div className="bg-emerald-700 px-5 md:px-8 py-2 md:py-4 rounded-lg md:rounded-2xl border-2 border-emerald-600 shadow-lg">
                        <span className="text-white font-black text-sm md:text-lg drop-shadow-sm">
                            {DateUtils.formatDate(currentMonth, 'MMM yyyy')}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};