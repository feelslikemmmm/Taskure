import React from 'react';
import UpcomingCard from './UpcomingCard';
import { Project, Task } from '@/types';
import RecentActivityCard from './RecentActivityCard';

interface TimeLineSectionProps {
  upcomingDeadlines: Task[];
  projects: Project[];
}

export default function TimeLineSection({
  upcomingDeadlines,
  projects,
}: TimeLineSectionProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <UpcomingCard upcomingDeadlines={upcomingDeadlines} projects={projects} />
      <RecentActivityCard />
    </div>
  );
}
