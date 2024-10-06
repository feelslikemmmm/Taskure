'use client';

import { useEffect } from 'react';
import {
  DndContext,
  DragOverlay,
  pointerWithin,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  type DragOverEvent,
} from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search } from 'lucide-react';
import TaskColumn from '@/components/projects/TaskColumn';
import TaskCard from '@/components/projects/TaskCard';
import AddTaskDialog from '@/components/tasks/AddTaskDialog';
import SearchTasksDialog from '@/components/dashboard/SearchTaskDialog';
import TaskDetailDialog from '@/components/tasks/TaskDetailDialog';
import { useDashboardStore, useTaskStore } from '@/lib/store/index';
import type { Task } from '@/types';

interface TaskDashboardProps {
  projectId?: string;
}

export default function TaskDashboard({ projectId }: TaskDashboardProps) {
  const isSearchOpen = useDashboardStore((state) => state.isSearchOpen);
  const setIsSearchOpen = useDashboardStore((state) => state.setIsSearchOpen);

  const {
    tasks,
    filteredTasks,
    selectedTask,
    isAddTaskOpen,
    activeTask,
    addTask,
    updateTask,
    setSelectedTask,
    setIsAddTaskOpen,
    setActiveId,
    setActiveTask,
    filterTasks,
    updateTaskStatus,
    reorderTasks,
  } = useTaskStore((state) => state);

  // projectId가 변경될 때 작업 필터링
  useEffect(() => {
    filterTasks(projectId);
  }, [projectId, filterTasks, tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 활성화 전 5px 이동 필요
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);

    const task = tasks.find((task) => task.id === active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over || !active) return;

    const activeTaskId = active.id as string;
    const overId = over.id as string;

    // 컬럼 ID 목록
    const columnIds = ['todo-column', 'in-progress-column', 'done-column'];

    // 컬럼으로 드래그 중인 경우
    if (columnIds.includes(overId)) {
      const newStatus =
        overId === 'todo-column'
          ? 'todo'
          : overId === 'in-progress-column'
          ? 'in-progress'
          : 'done';

      updateTaskStatus(activeTaskId, newStatus);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveId(null);
    setActiveTask(null);

    if (!over) return;

    const activeTaskId = active.id as string;
    const overId = over.id as string;

    // 컬럼 ID 목록
    const columnIds = ['todo-column', 'in-progress-column', 'done-column'];

    // 컬럼으로 드롭한 경우 (이미 handleDragOver에서 처리됨)
    if (columnIds.includes(overId)) {
      return;
    }

    // 다른 작업 위에 드롭한 경우 (순서 변경)
    reorderTasks(activeTaskId, overId);
  };

  const handleAddTask = (task: Omit<Task, 'id'>) => {
    addTask(task, projectId);
    setIsAddTaskOpen(false);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  const todoTasks = filteredTasks.filter((task) => task.status === 'todo');
  const inProgressTasks = filteredTasks.filter(
    (task) => task.status === 'in-progress'
  );
  const doneTasks = filteredTasks.filter((task) => task.status === 'done');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {projectId ? '프로젝트 작업' : '모든 작업'}
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsSearchOpen(true)}>
            <Search className="mr-2 h-4 w-4" />
            검색
          </Button>
          <Button onClick={() => setIsAddTaskOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            작업 추가
          </Button>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={pointerWithin}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToWindowEdges]}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SortableContext
            items={todoTasks.map((task) => task.id)}
            strategy={verticalListSortingStrategy}
          >
            <TaskColumn
              id="todo-column"
              title="할 일"
              tasks={todoTasks}
              onTaskClick={handleTaskClick}
            />
          </SortableContext>

          <SortableContext
            items={inProgressTasks.map((task) => task.id)}
            strategy={verticalListSortingStrategy}
          >
            <TaskColumn
              id="in-progress-column"
              title="진행 중"
              tasks={inProgressTasks}
              onTaskClick={handleTaskClick}
            />
          </SortableContext>

          <SortableContext
            items={doneTasks.map((task) => task.id)}
            strategy={verticalListSortingStrategy}
          >
            <TaskColumn
              id="done-column"
              title="완료"
              tasks={doneTasks}
              onTaskClick={handleTaskClick}
            />
          </SortableContext>
        </div>

        <DragOverlay>
          {activeTask ? (
            <div className="w-full max-w-[350px]">
              <TaskCard task={activeTask} isDragging={true} overlay={true} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <AddTaskDialog
        open={isAddTaskOpen}
        onOpenChange={setIsAddTaskOpen}
        projects={pro}
      />

      <SearchTasksDialog
        open={isSearchOpen}
        onOpenChange={setIsSearchOpen}
        tasks={tasks}
        onTaskClick={handleTaskClick}
      />

      {selectedTask && (
        <TaskDetailDialog
          open={!!selectedTask}
          onOpenChange={(open) => !open && setSelectedTask(null)}
          task={selectedTask}
          // onUpdateTask={updateTask}
        />
      )}
    </div>
  );
}
