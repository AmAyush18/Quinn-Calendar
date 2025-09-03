export interface JournalEntry {
  imgUrl: string;
  rating: number;
  categories: string[];
  date: string;
  description: string;
  parsedDate?: Date;
}

export interface DayData {
  date: Date;
  isCurrentMonth: boolean;
  dateKey: string;
}

export interface MonthData {
  monthDate: Date;
  days: DayData[];
  weeks: number;
}

export interface VirtualizedMonthData extends MonthData {
  index: number;
  top: number;
}

export interface EntriesByDate {
  [key: string]: JournalEntry[];
}