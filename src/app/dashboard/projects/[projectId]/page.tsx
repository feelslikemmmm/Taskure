'use client';

import ProjectView from '@/components/projects/ProjectView';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDashboardStore, useUserStore } from '@/lib/store/index';
import useProjects from '@/hooks/useProjects';
import { Project } from '@/types';

export default function ProjectPage() {
  const { setActiveProjectId } = useDashboardStore();
  const user = useUserStore((state) => state.user);
  const {
    getProjects: { data: projects },
  } = useProjects(user?.uid ?? '');

  const params = useParams();
  const projectId = params.projectId as string;

  useEffect(() => {
    setActiveProjectId(projectId);
  }, [projectId, setActiveProjectId]);

  const currentProject = projects?.find((p) => p.id === projectId);

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">프로젝트를 찾을 수 없습니다</p>
      </div>
    );
  }

  return (
    <ProjectView projects={projects as Project[]} project={currentProject} />
  );
}
