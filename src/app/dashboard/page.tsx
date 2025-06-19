'use client';

import Overview from '@/components/dashboard/Overview';
import StatusSection from '@/components/dashboard/StatusSection';
import SummarySection from '@/components/dashboard/SummarySection';
import TimeLineSection from '@/components/dashboard/TimeLineSection';
import useProjects from '@/hooks/useProjects';
import useTasks from '@/hooks/useTasks';
import useDashboardStats from '@/hooks/useDashboardStats';
import { useUserStore } from '@/lib/store/index';
import { TimeRange } from '@/types';

export default function DashboardPage() {
  const user = useUserStore((state) => state.user);

  const {
    getProjects: { data: projects = [], isLoading: projectLoading },
  } = useProjects(user?.uid ?? '');

  const {
    getTasks: { data: tasks = [], isLoading: tasksLoading },
  } = useTasks({ userId: user?.uid ?? '' });

  const {
    timeRange,
    setTimeRange,
    totalTasks,
    completedTasks,
    completionRate,
    inProgressTasks,
    todoTasks,
    upcomingDeadlines,
    filteredTasks,
  } = useDashboardStats({ tasks });

  const filterTasksByTimeRange = (range: TimeRange) => {
    setTimeRange(range);
  };

  return (
    <div className="space-y-6">
      <Overview
        timeRange={timeRange}
        filterTasksByTimeRange={filterTasksByTimeRange}
      />
      <SummarySection
        totalTasks={totalTasks}
        completedTasks={completedTasks.length}
        inProgressTasks={inProgressTasks.length}
        todoTasks={todoTasks.length}
        completionRate={completionRate}
      />
      <StatusSection
        completedTasks={completedTasks.length}
        inProgressTasks={inProgressTasks.length}
        todoTasks={todoTasks.length}
        completionRate={completionRate}
        totalTasks={totalTasks}
        projects={projects}
        tasks={filteredTasks}
      />
      <TimeLineSection
        upcomingDeadlines={upcomingDeadlines}
        projects={projects}
      />
    </div>
  );
}
