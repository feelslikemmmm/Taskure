import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowRight, Calendar } from 'lucide-react';
import { Project, Task } from '@/types';
import Link from 'next/link';

interface UpcomingCardProps {
  upcomingDeadlines: Task[];
  projects: Project[];
}
export default function UpcomingCard({
  upcomingDeadlines,
  projects,
}: UpcomingCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>다가오는 마감일</CardTitle>
        <Link href="/dashboard/tasks">
          <Button variant="ghost" size="sm" className="cursor-pointer">
            모두 보기
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingDeadlines.length > 0 ? (
            upcomingDeadlines.map((task) => (
              <div key={task.id} className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {task.title}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span
                      className="inline-block h-2 w-2 rounded-full mr-1"
                      style={{
                        backgroundColor: projects?.find(
                          (p) => p.id === task.projectId
                        )?.color,
                      }}
                    ></span>
                    {projects?.find((p) => p.id === task.projectId)?.name ||
                      '미분류'}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                    {task.dueDate &&
                      new Date(task.dueDate).toLocaleDateString()}
                  </div>
                  {task.dueDate &&
                    new Date(task.dueDate).getTime() - new Date().getTime() <
                      3 * 24 * 60 * 60 * 1000 && (
                      <span className="flex h-2 w-2 rounded-full bg-red-500"></span>
                    )}
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-24 text-muted-foreground">
              다가오는 마감일이 없습니다
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
