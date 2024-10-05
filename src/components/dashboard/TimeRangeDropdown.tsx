import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Calendar } from 'lucide-react';
import { TimeRange } from '@/types';
import { TIME_RANGE_TEXT } from '@/constants/timeRangeText';

interface TimeRangeDropdownProps {
  timeRange: TimeRange;
  filterTasksByTimeRange: (range: TimeRange) => void;
}

export default function TimeRangeDropdown({
  timeRange,
  filterTasksByTimeRange,
}: TimeRangeDropdownProps) {
  return (
    <div className="flex gap-2">
      <Select value={timeRange} onValueChange={filterTasksByTimeRange}>
        <SelectTrigger className="w-[130px]">
          <Calendar className="mr-2 h-4 w-4" />
          <SelectValue
            placeholder={
              TIME_RANGE_TEXT[timeRange as keyof typeof TIME_RANGE_TEXT]
            }
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">전체</SelectItem>
          <SelectItem value="today">오늘</SelectItem>
          <SelectItem value="week">이번주</SelectItem>
          <SelectItem value="month">한달</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
