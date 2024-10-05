import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Activity, CheckCircle2, Clock, ListTodo } from 'lucide-react';

interface SummarySectionProps {
  totalTasks: number;
  completedTasks: number;
  completionRate: number;
  inProgressTasks: number;
  todoTasks: number;
}

export default function SummarySection({
  totalTasks,
  completedTasks,
  completionRate,
  inProgressTasks,
  todoTasks,
}: SummarySectionProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">총 작업</CardTitle>
          <ListTodo className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalTasks}</div>
          <p className="text-xs text-muted-foreground">모든 프로젝트의 작업</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">완료된 작업</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completedTasks}</div>
          <p className="text-xs text-muted-foreground">
            전체의 {completionRate}%
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">진행 중인 작업</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{inProgressTasks}</div>
          <p className="text-xs text-muted-foreground">
            전체의{' '}
            {totalTasks > 0
              ? Math.round((inProgressTasks / totalTasks) * 100)
              : 0}
            %
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">남은 작업</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{todoTasks}</div>
          <p className="text-xs text-muted-foreground">
            전체의{' '}
            {totalTasks > 0 ? Math.round((todoTasks / totalTasks) * 100) : 0}%
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
