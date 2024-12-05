'use client';
import { useState } from 'react';
import type { Project, Task } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  PlusCircle,
  Calendar,
  CheckCircle2,
  Clock,
  ListTodo,
  Edit,
} from 'lucide-react';
import TaskDashboard from '@/components/projects/TaskDashboard';
import AddTaskDialog from '@/components/tasks/AddTaskDialog';
import { useUserStore } from '@/lib/store/index';
import useTasks from '@/hooks/useTasks';

interface ProjectViewProps {
  projects: Project[];
  project: Project;
}

export default function ProjectView({ projects, project }: ProjectViewProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const user = useUserStore((state) => state.user);

  const {
    getTasks: { data: projectTasks = [] },
    addTask: { mutate: addTask },
  } = useTasks({ userId: user?.uid ?? '', projectId: project.id });

  const totalTasks = projectTasks.length;
  const completedTasks = projectTasks.filter(
    (task) => task.status === 'done'
  ).length;
  const inProgressTasks = projectTasks.filter(
    (task) => task.status === 'in-progress'
  ).length;
  const todoTasks = projectTasks.filter(
    (task) => task.status === 'todo'
  ).length;

  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="h-6 w-6 rounded-full"
            style={{ backgroundColor: project.color }}
          ></div>
          <h1 className="text-2xl font-bold">{project.name}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            프로젝트 편집
          </Button>
          <Button onClick={() => setIsAddTaskOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            작업 추가
          </Button>
        </div>
      </div>

      {project.description && (
        <p className="text-muted-foreground">{project.description}</p>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="board">보드</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">총 작업</CardTitle>
                <ListTodo className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalTasks}</div>
                <p className="text-xs text-muted-foreground">
                  프로젝트의 모든 작업
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  완료된 작업
                </CardTitle>
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
                <CardTitle className="text-sm font-medium">
                  진행 중인 작업
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
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
                <ListTodo className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{todoTasks}</div>
                <p className="text-xs text-muted-foreground">
                  전체의{' '}
                  {totalTasks > 0
                    ? Math.round((todoTasks / totalTasks) * 100)
                    : 0}
                  %
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>프로젝트 진행 상황</CardTitle>
              <CardDescription>전체 작업 완료율</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>다가오는 마감일</CardTitle>
              <CardDescription>이 프로젝트의 다가오는 마감일</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectTasks
                  .filter(
                    (task) =>
                      task.dueDate && new Date(task.dueDate) > new Date()
                  )
                  .sort((a, b) => {
                    const dateA = a.dueDate
                      ? new Date(a.dueDate).getTime()
                      : Number.MAX_SAFE_INTEGER;
                    const dateB = b.dueDate
                      ? new Date(b.dueDate).getTime()
                      : Number.MAX_SAFE_INTEGER;
                    return dateA - dateB;
                  })
                  .slice(0, 5)
                  .map((task) => (
                    <div
                      key={task.id}
                      className="flex items-start justify-between"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {task.title}
                        </p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          {task.status === 'todo'
                            ? '할 일'
                            : task.status === 'in-progress'
                            ? '진행 중'
                            : '완료'}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                          {new Date(task.dueDate!).toLocaleDateString()}
                        </div>
                        {new Date(task.dueDate!).getTime() -
                          new Date().getTime() <
                          3 * 24 * 60 * 60 * 1000 && (
                          <span className="flex h-2 w-2 rounded-full bg-red-500"></span>
                        )}
                      </div>
                    </div>
                  ))}
                {projectTasks.filter(
                  (task) => task.dueDate && new Date(task.dueDate) > new Date()
                ).length === 0 && (
                  <div className="flex items-center justify-center h-24 text-muted-foreground">
                    다가오는 마감일이 없습니다
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="board">
          <TaskDashboard projectId={project.id} />
        </TabsContent>
      </Tabs>

      <AddTaskDialog
        open={isAddTaskOpen}
        onOpenChange={setIsAddTaskOpen}
        projects={projects}
      />
    </div>
  );
}
