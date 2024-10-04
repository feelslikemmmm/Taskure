'use client';
import AddTaskDialog from '@/components/tasks/AddTaskDialog';
import TaskDetailDialog from '@/components/tasks/TaskDetailDialog';
import TasksFilterSection from '@/components/tasks/TasksFilterSection';
import TasksHeader from '@/components/tasks/TasksHeader';
import TasksTableSection from '@/components/tasks/TasksTableSection';
import useProjects from '@/hooks/useProjects';
import useTasks from '@/hooks/useTasks';
import useTaskStats from '@/hooks/useTaskStats';
import { useUserStore } from '@/lib/store';

export default function AllTasksPage() {
  const user = useUserStore((state) => state.user);

  const {
    getProjects: { data: projects = [] },
  } = useProjects(user?.uid ?? '');

  const {
    getTasks: { data: tasks = [] },
    updateTask: { mutate: onUpdateTask },
  } = useTasks({ userId: user?.uid ?? '' });

  const {
    setIsAddTaskOpen,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    projectFilter,
    setProjectFilter,
    handleSort,
    sortField,
    sortDirection,
    selectedTask,
    filteredTasks,
    setSelectedTask,
    isAddTaskOpen,
  } = useTaskStats({ tasks: tasks });

  console.log('selectedTask', selectedTask);

  return (
    <div className="space-y-6">
      <TasksHeader setIsAddTaskOpen={setIsAddTaskOpen} />
      <TasksFilterSection
        projects={projects}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        projectFilter={projectFilter}
        setProjectFilter={setProjectFilter}
      />
      <TasksTableSection
        handleSort={handleSort}
        sortField={sortField}
        sortDirection={sortDirection}
        filteredTasks={filteredTasks}
        projects={projects}
        setSelectedTask={setSelectedTask}
      />
      <AddTaskDialog
        open={isAddTaskOpen}
        onOpenChange={setIsAddTaskOpen}
        projects={projects}
      />
      {selectedTask && (
        <TaskDetailDialog
          open={!!selectedTask}
          onOpenChange={(open) => !open && setSelectedTask(null)}
          task={selectedTask}
          onUpdateTask={onUpdateTask}
        />
      )}
    </div>
  );
}
