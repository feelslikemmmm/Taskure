'use client';

import type { Task } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  Filter,
  PlusCircle,
  Search,
  SortAsc,
  SortDesc,
} from 'lucide-react';
import AddTaskDialog from '@/components/tasks/AddTaskDialog';
import TaskDetailDialog from '@/components/tasks/TaskDetailDialog';
import { useTaskStore, useUserStore } from '@/lib/store/index';
import useProjects from '@/hooks/useProjects';

export default function AllTasksView() {
  const user = useUserStore((state) => state.user);
  const {
    getProjects: { data: projects },
  } = useProjects(user?.uid ?? '');

  console.log('projects', projects);

  const {
    filteredTasks,
    selectedTask,
    isAddTaskOpen,
    searchQuery,
    statusFilter,
    priorityFilter,
    projectFilter,
    sortField,
    sortDirection,
    addTask,
    updateTask,
    setSelectedTask,
    setIsAddTaskOpen,
    setSearchQuery,
    setStatusFilter,
    setPriorityFilter,
    setProjectFilter,
    setSortField,
    setSortDirection,
    // filterTasks,
  } = useTaskStore((state) => state);

  // 컴포넌트 마운트 시 모든 작업 표시
  // useEffect(() => {
  //   filterTasks();
  // }, [filterTasks]);

  const handleSort = (field: keyof Task) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const priorityLabels = {
    low: '낮음',
    medium: '중간',
    high: '높음',
  };

  const statusLabels = {
    todo: '할 일',
    'in-progress': '진행 중',
    done: '완료',
  };

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  const statusColors = {
    todo: 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-purple-100 text-purple-800',
    done: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">모든 작업</h1>
        <Button onClick={() => setIsAddTaskOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          작업 추가
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="작업 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="상태" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">모든 상태</SelectItem>
              <SelectItem value="todo">할 일</SelectItem>
              <SelectItem value="in-progress">진행 중</SelectItem>
              <SelectItem value="done">완료</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[130px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="우선순위" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">모든 우선순위</SelectItem>
              <SelectItem value="low">낮음</SelectItem>
              <SelectItem value="medium">중간</SelectItem>
              <SelectItem value="high">높음</SelectItem>
            </SelectContent>
          </Select>

          <Select value={projectFilter} onValueChange={setProjectFilter}>
            <SelectTrigger className="w-[130px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="프로젝트" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">모든 프로젝트</SelectItem>
              {projects?.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort('title')}
              >
                제목
                {sortField === 'title' &&
                  (sortDirection === 'asc' ? (
                    <SortAsc className="inline ml-1 h-4 w-4" />
                  ) : (
                    <SortDesc className="inline ml-1 h-4 w-4" />
                  ))}
              </TableHead>
              <TableHead>상태</TableHead>
              <TableHead>우선순위</TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort('dueDate')}
              >
                마감일
                {sortField === 'dueDate' &&
                  (sortDirection === 'asc' ? (
                    <SortAsc className="inline ml-1 h-4 w-4" />
                  ) : (
                    <SortDesc className="inline ml-1 h-4 w-4" />
                  ))}
              </TableHead>
              <TableHead>프로젝트</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <TableRow
                  key={task.id}
                  className="cursor-pointer"
                  onClick={() => setSelectedTask(task)}
                >
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={statusColors[task.status]}
                    >
                      {statusLabels[task.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={priorityColors[task.priority]}
                    >
                      {priorityLabels[task.priority]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {task.dueDate ? (
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        {new Date(task.dueDate).toISOString().slice(0, 10)}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">없음</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {task.projectId ? (
                      <div className="flex items-center">
                        <span
                          className="h-2 w-2 rounded-full mr-2"
                          style={{
                            backgroundColor: projects?.find(
                              (p) => p.id === task.projectId
                            )?.color,
                          }}
                        ></span>
                        {projects?.find((p) => p.id === task.projectId)?.name ||
                          '알 수 없음'}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">없음</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  검색 결과가 없습니다
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AddTaskDialog
        open={isAddTaskOpen}
        onOpenChange={setIsAddTaskOpen}
        onAddTask={addTask}
      />

      {selectedTask && (
        <TaskDetailDialog
          open={!!selectedTask}
          onOpenChange={(open) => !open && setSelectedTask(null)}
          task={selectedTask}
          onUpdateTask={updateTask}
        />
      )}
    </div>
  );
}
