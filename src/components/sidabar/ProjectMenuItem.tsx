'use client';

import { Button } from '@/components/ui/button';
import useProjects from '@/hooks/useProjects';
import { useDashboardStore, useUserStore } from '@/lib/store';
import { PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { Dispatch, SetStateAction } from 'react';

interface ProjectMenuItemProps {
  setIsCreateProjectOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ProjectMenuItem({
  setIsCreateProjectOpen,
}: ProjectMenuItemProps) {
  const user = useUserStore((state) => state.user);
  const activeProjectId = useDashboardStore((state) => state.activeProjectId);
  const setActiveProjectId = useDashboardStore(
    (state) => state.setActiveProjectId
  );
  const router = useRouter();

  const {
    getProjects: { data: projects },
  } = useProjects(user?.uid ?? '');

  return (
    <div className="px-3 py-2">
      <div className="flex items-center justify-between px-4">
        <h2 className="text-lg font-semibold tracking-tight">프로젝트</h2>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 cursor-pointer"
          onClick={() => setIsCreateProjectOpen(true)}
        >
          <PlusCircle className="h-4 w-4" />
          <span className="sr-only">프로젝트 추가</span>
        </Button>
      </div>
      <div className="space-y-1 mt-2">
        {projects?.map((project) => (
          <Button
            key={project.id}
            variant={activeProjectId === project.id ? 'secondary' : 'ghost'}
            className="w-full justify-start cursor-pointer"
            onClick={() => {
              setActiveProjectId(project.id);
              router.push(`/dashboard/projects/${project.id}`);
            }}
          >
            <span
              className="mr-2 h-2 w-2 rounded-full"
              style={{ backgroundColor: project.color }}
            />
            {project.name}
          </Button>
        ))}
        {projects?.length === 0 && (
          <p className="text-sm text-muted-foreground px-4 py-2">
            아직 프로젝트가 없습니다
          </p>
        )}
      </div>
    </div>
  );
}
