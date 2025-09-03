import type { DayData, MonthData } from '../types';
import { DateUtils } from './dateUtils';

export const CalendarUtils = {
    MONTH_HEIGHT: 540,
    
    getMonthData: (date: Date): MonthData => {
        const year = date.getFullYear();
        const month = date.getMonth();
        
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        
        const endDate = new Date(lastDay);
        endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));
        
        const days: DayData[] = [];
        const current = new Date(startDate);
        
        while (current <= endDate) {
        days.push({
            date: new Date(current),
            isCurrentMonth: current.getMonth() === month,
            dateKey: DateUtils.formatDate(current, 'dd/MM/yyyy')
        });
        current.setDate(current.getDate() + 1);
        }
        
        return {
        monthDate: new Date(year, month, 1),
        days,
        weeks: Math.ceil(days.length / 7)
        };
    }
};