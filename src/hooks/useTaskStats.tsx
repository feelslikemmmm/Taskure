import { useMemo, useState } from 'react';
import { Task, FilterStatus, FilterPriority } from '@/types';

export default function useTaskStats({ tasks }: { tasks: Task[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [priorityFilter, setPriorityFilter] = useState<FilterPriority>('all');
  const [projectFilter, setProjectFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<'dueDate' | 'createdAt'>(
    'createdAt'
  );
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) =>
        statusFilter === 'all' ? true : task.status === statusFilter
      )
      .filter((task) =>
        priorityFilter === 'all' ? true : task.priority === priorityFilter
      )
      .filter((task) =>
        projectFilter === 'all' ? true : task.projectId === projectFilter
      )
      .filter((task) =>
        searchQuery.trim() === ''
          ? true
          : task.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        const fieldA = a[sortField];
        const fieldB = b[sortField];

        if (fieldA === fieldB) return 0;

        return sortDirection === 'asc'
          ? fieldA > fieldB
            ? 1
            : -1
          : fieldA < fieldB
          ? 1
          : -1;
      });
  }, [
    tasks,
    statusFilter,
    priorityFilter,
    projectFilter,
    searchQuery,
    sortField,
    sortDirection,
  ]);

  const handleSort = (field: keyof Task) => {
    if (field !== 'dueDate' && field !== 'createdAt') return;

    if (field === sortField) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return {
    setIsAddTaskOpen,
    isAddTaskOpen,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    projectFilter,
    setProjectFilter,
    handleSort,
    sortField,
    sortDirection,
    selectedTask,
    setSelectedTask,
    filteredTasks,
  };
}
