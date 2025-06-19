import { Task, TimeRange } from '@/types';

export function filterTasksByTimeRange(
  tasks: Task[],
  timeRange: TimeRange
): Task[] {
  if (timeRange === 'all') return tasks;

  const now = new Date();
  return tasks.filter((task) => {
    const dueDate = task.dueDate ? new Date(task.dueDate) : null;
    if (!dueDate) return false;

    const diffDays = Math.floor(
      (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    switch (timeRange) {
      case 'week':
        return diffDays <= 7;
      case 'month':
        return diffDays <= 30;
      default:
        return true;
    }
  });
}
