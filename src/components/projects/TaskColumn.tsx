import TaskCard from '@/components/projects/TaskCard';
import { Task } from '@/types';
import { useDroppable } from '@dnd-kit/core';

interface TaskColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
}

export default function TaskColumn({
  id,
  title,
  tasks,
  onTaskClick,
}: TaskColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`bg-muted/40 rounded-lg p-4 h-full flex flex-col transition-colors duration-200 ${
        isOver ? 'bg-muted/70' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">{title}</h3>
        <span className="text-muted-foreground text-sm">{tasks.length}</span>
      </div>
      <div className="space-y-3 flex-1 min-h-[300px]">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onTaskClick={onTaskClick} />
        ))}
        {tasks.length === 0 && (
          <div className="text-center py-8 text-muted-foreground text-sm">
            작업 없음
          </div>
        )}
      </div>
    </div>
  );
}
