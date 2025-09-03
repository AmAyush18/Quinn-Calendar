export const DateUtils = {
    parseDate: (dateStr: string): Date => {
        const [day, month, year] = dateStr.split('/');
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    },

    formatDate: (date: Date, format: string): string => {
        if (format === 'MMMM yyyy') {
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
        }
        if (format === 'MMM yyyy') {
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
        }
        if (format === 'd') {
        return date.getDate().toString();
        }
        if (format === 'dd/MM/yyyy') {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
        }
        return date.toLocaleDateString();
    },

    isSameDay: (date1: Date, date2: Date): boolean => {
        return date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear();
    },

    isSameMonth: (date1: Date, date2: Date): boolean => {
        return date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear();
    },

    addMonths: (date: Date, months: number): Date => {
        const result = new Date(date);
        result.setMonth(result.getMonth() + months);
        return result;
    },

    getMonthKey: (date: Date): string => {
        return `${date.getFullYear()}-${date.getMonth()}`;
    }
};