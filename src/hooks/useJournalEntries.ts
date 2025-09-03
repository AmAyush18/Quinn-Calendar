import { useMemo } from 'react';
import type { JournalEntry, EntriesByDate } from '../types';
import { DateUtils } from '../utils';

export const useJournalEntries = (journalData: JournalEntry[]) => {
    const entriesByDate = useMemo<EntriesByDate>(() => {
        const grouped: EntriesByDate = {};
        journalData.forEach(entry => {
        const date = DateUtils.parseDate(entry.date);
        const key = DateUtils.formatDate(date, 'dd/MM/yyyy');
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(entry);
        });
        return grouped;
    }, [journalData]);

    const allEntries = useMemo<JournalEntry[]>(() => {
        return journalData
        .map(entry => ({ ...entry, parsedDate: DateUtils.parseDate(entry.date) }))
        .sort((a, b) => (a.parsedDate!.getTime() - b.parsedDate!.getTime()));
    }, [journalData]);

    return {
        entriesByDate,
        allEntries
    };
};