import { useMemo, useState } from 'react';
import { Task, TimeRange } from '@/types';
import { filterTasksByTimeRange } from '@/lib/utils/taskUtils';

export default function useDashboardStats({ tasks }: { tasks: Task[] }) {
  const [timeRange, setTimeRange] = useState<TimeRange>('all');

  const filteredTasks = useMemo(
    () => filterTasksByTimeRange(tasks, timeRange),
    [tasks, timeRange]
  );

  const totalTasks = filteredTasks.length;
  const completedTasks = filteredTasks.filter((t) => t.status === 'done');
  const inProgressTasks = filteredTasks.filter(
    (t) => t.status === 'in-progress'
  );
  const todoTasks = filteredTasks.filter((t) => t.status === 'todo');

  const upcomingDeadlines = filteredTasks.filter(
    (t) => t.dueDate && new Date(t.dueDate) > new Date()
  );

  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks.length / totalTasks) * 100) : 0;

  return {
    timeRange,
    setTimeRange,
    totalTasks,
    completedTasks,
    completionRate,
    inProgressTasks,
    todoTasks,
    upcomingDeadlines,
    filteredTasks,
  };
}
