import React, { useState, useCallback } from 'react';
import type { JournalEntry } from './types';
import { DateUtils, CalendarUtils } from './utils';
import { useJournalEntries, useVirtualization } from './hooks';
import { Header } from './components/layout';
import { VirtualizedMonth } from './components/calendar';
import { JournalModal } from './components/journal';
import { journalData } from './data/sample';

const App: React.FC = () => {
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const { entriesByDate, allEntries } = useJournalEntries(journalData);
  const {
    containerRef,
    isScrollingRef,
    visibleMonths,
    currentMonth,
    handleScroll,
    totalMonths
  } = useVirtualization();

  const handleEntryClick = useCallback((entry: JournalEntry) => {
    const index = allEntries.findIndex(e => e.date === entry.date && e.description === entry.description);
    setSelectedEntry(entry);
    setSelectedIndex(index);
  }, [allEntries]);

  const handlePrev = useCallback(() => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
      setSelectedEntry(allEntries[selectedIndex - 1]);
    }
  }, [selectedIndex, allEntries]);

  const handleNext = useCallback(() => {
    if (selectedIndex < allEntries.length - 1) {
      setSelectedIndex(selectedIndex + 1);
      setSelectedEntry(allEntries[selectedIndex + 1]);
    }
  }, [selectedIndex, allEntries]);

  return (
    <div className="flex flex-col bg-stone-100">
      <Header currentMonth={currentMonth} />

      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto"
        onScroll={handleScroll}
        style={{ 
          height: 'auto',
          scrollBehavior: isScrollingRef.current ? 'auto' : 'smooth'
        }}
      >
        <div 
          style={{ 
            height: totalMonths * CalendarUtils.MONTH_HEIGHT,
            position: 'relative'
          }}
        >
          {visibleMonths.map((month) => (
            <VirtualizedMonth
              key={DateUtils.getMonthKey(month.monthDate)}
              monthData={month}
              entriesByDate={entriesByDate}
              onEntryClick={handleEntryClick}
              style={{
                position: 'absolute',
                top: month.top,
                left: 0,
                right: 0,
                height: CalendarUtils.MONTH_HEIGHT
              }}
            />
          ))}
        </div>
      </div>

      {selectedEntry && (
        <JournalModal 
          entry={selectedEntry}
          onClose={() => setSelectedEntry(null)}
          onPrev={handlePrev}
          onNext={handleNext}
          hasPrev={selectedIndex > 0}
          hasNext={selectedIndex < allEntries.length - 1}
        />
      )}
    </div>
  );
};

export default App;