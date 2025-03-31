import { Task, TimeRange } from '@/types';
import { useMemo, useState } from 'react';

interface useTaskStatsProps {
  tasks: Task[];
}

export default function useTaskStats({ tasks }: useTaskStatsProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('all');

  const filteredTasks = useMemo(() => {
    const now = new Date();

    const today = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ).getTime();

    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    const startOfWeekTime = startOfWeek.getTime();

    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    ).getTime();

    switch (timeRange) {
      case 'today':
        return tasks.filter((task) => task.createdAt >= today);
      case 'week':
        return tasks.filter((task) => task.createdAt >= startOfWeekTime);
      case 'month':
        return tasks.filter((task) => task.createdAt >= startOfMonth);
      case 'all':
      default:
        return tasks;
    }
  }, [tasks, timeRange]);

  const totalTasks = filteredTasks.length;
  const completedTasks = filteredTasks.filter(
    (task) => task.status === 'done'
  ).length;
  const inProgressTasks = filteredTasks.filter(
    (task) => task.status === 'in-progress'
  ).length;
  const todoTasks = filteredTasks.filter(
    (task) => task.status === 'todo'
  ).length;

  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const upcomingDeadlines = useMemo(() => {
    return filteredTasks
      .filter((task) => task.dueDate && new Date(task.dueDate) > new Date())
      .sort(
        (a, b) =>
          new Date(a.dueDate ?? 0).getTime() -
          new Date(b.dueDate ?? 0).getTime()
      )
      .slice(0, 2);
  }, [filteredTasks]);

  return {
    timeRange,
    setTimeRange,
    filteredTasks,
    totalTasks,
    completedTasks,
    inProgressTasks,
    todoTasks,
    completionRate,
    upcomingDeadlines,
  };
}
