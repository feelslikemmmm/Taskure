import React from 'react';
import TimeRangeDropdown from './TimeRangeDropdown';
import { TimeRange } from '@/types';

interface OverviewProps {
  timeRange: TimeRange;
  filterTasksByTimeRange: (range: TimeRange) => void;
}
export default function Overview({
  timeRange,
  filterTasksByTimeRange,
}: OverviewProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">대시보드 개요</h1>
      <TimeRangeDropdown
        timeRange={timeRange}
        filterTasksByTimeRange={filterTasksByTimeRange}
      />
    </div>
  );
}
