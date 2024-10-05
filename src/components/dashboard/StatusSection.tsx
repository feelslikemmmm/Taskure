import React, { CSSProperties } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Progress } from '../ui/progress';
import { Project, Task } from '@/types';

interface StatusSectionProps {
  completedTasks: number;
  completionRate: number;
  inProgressTasks: number;
  todoTasks: number;
  totalTasks: number;
  projects: Project[];
  tasks: Task[];
}

export default function StatusSection({
  completedTasks,
  completionRate,
  inProgressTasks,
  todoTasks,
  totalTasks,
  projects,
  tasks,
}: StatusSectionProps) {
  console.log('StatusSection 내부 tasks 개수:', tasks.length);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>작업 진행 상황</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="h-[200px] flex items-center justify-center">
            <div className="w-full max-w-md space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    <span className="text-sm font-medium">완료됨</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {completedTasks} 작업
                  </span>
                </div>
                <Progress value={completionRate} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                    <span className="text-sm font-medium">진행 중</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {inProgressTasks} 작업
                  </span>
                </div>
                <Progress
                  value={
                    totalTasks > 0
                      ? Math.round((inProgressTasks / totalTasks) * 100)
                      : 0
                  }
                  className="h-2 bg-muted [&>div]:bg-purple-500"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                    <span className="text-sm font-medium">할 일</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {todoTasks} 작업
                  </span>
                </div>
                <Progress
                  value={
                    totalTasks > 0
                      ? Math.round((todoTasks / totalTasks) * 100)
                      : 0
                  }
                  className="h-2 bg-muted [&>div]:bg-blue-500"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>프로젝트 분포</CardTitle>
          <CardDescription>프로젝트별 작업 분포</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center">
            <div className="w-full max-w-md space-y-4">
              {projects?.map((project) => {
                const projectTaskCount = tasks.filter(
                  (task) => task.projectId === project.id
                ).length;
                const projectPercentage =
                  totalTasks > 0
                    ? Math.round((projectTaskCount / totalTasks) * 100)
                    : 0;

                return (
                  <div key={project.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: project.color }}
                        ></span>
                        <span className="text-sm font-medium">
                          {project.name}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {projectTaskCount} 작업
                      </span>
                    </div>
                    <Progress
                      value={projectPercentage}
                      className="h-2 bg-muted"
                      style={
                        {
                          '--progress-background': project.color,
                        } as CSSProperties
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
