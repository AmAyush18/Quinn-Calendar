import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import type { VirtualizedMonthData } from '../types';
import { DateUtils, CalendarUtils } from '../utils';

export const useVirtualization = () => {
    const [scrollTop, setScrollTop] = useState<number>(0);
    const [containerHeight, setContainerHeight] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const isScrollingRef = useRef<boolean>(false);
    const scrollTimeoutRef = useRef<number | null>(null);

    const baseDate = useMemo(() => new Date(2020, 0, 1), []);
    const totalMonths = useMemo(() => 240, []);
    
    const monthsDifference = useMemo(() => {
        const currentDate = new Date();
        return (currentDate.getFullYear() - baseDate.getFullYear()) * 12 + 
               (currentDate.getMonth() - baseDate.getMonth());
    }, [baseDate]);

    const visibleMonths = useMemo<VirtualizedMonthData[]>(() => {
        if (!containerHeight) return [];
        
        const buffer = CalendarUtils.MONTH_HEIGHT;
        const startIndex = Math.max(0, Math.floor((scrollTop - buffer) / CalendarUtils.MONTH_HEIGHT));
        const endIndex = Math.min(totalMonths, startIndex + Math.ceil((containerHeight + 2 * buffer) / CalendarUtils.MONTH_HEIGHT));
        
        const months: VirtualizedMonthData[] = [];
        for (let i = startIndex; i < endIndex; i++) {
            const monthDate = DateUtils.addMonths(baseDate, i);
            const monthData = CalendarUtils.getMonthData(monthDate);
            months.push({
                ...monthData,
                index: i,
                top: i * CalendarUtils.MONTH_HEIGHT
            });
        }
        
        return months;
    }, [scrollTop, containerHeight, baseDate, totalMonths]);

    const currentMonth = useMemo<Date>(() => {
        const monthIndex = Math.floor((scrollTop + containerHeight / 2) / CalendarUtils.MONTH_HEIGHT);
        return DateUtils.addMonths(baseDate, monthIndex);
    }, [scrollTop, containerHeight, baseDate]);

    const handleScroll = useCallback(() => {
        if (!containerRef.current) return;
        
        isScrollingRef.current = true;
        
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }
        
        requestAnimationFrame(() => {
            if (containerRef.current) {
                setScrollTop(containerRef.current.scrollTop);
            }
        });
        
        scrollTimeoutRef.current = setTimeout(() => {
            isScrollingRef.current = false;
        }, 150);
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new ResizeObserver(([entry]) => {
            setContainerHeight(entry.contentRect.height);
        });

        observer.observe(container);
        setContainerHeight(container.clientHeight);

        setTimeout(() => {
            container.scrollTop = monthsDifference * CalendarUtils.MONTH_HEIGHT;
        }, 100);

        return () => {
            observer.disconnect();
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, [monthsDifference]);

    return {
        scrollTop,
        containerHeight,
        containerRef,
        isScrollingRef,
        visibleMonths,
        currentMonth,
        handleScroll,
        monthsDifference,
        totalMonths
    };
};