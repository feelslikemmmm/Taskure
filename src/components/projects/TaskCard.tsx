'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, GripVertical } from 'lucide-react';
import { Task } from '@/types';

interface TaskCardProps {
  task: Task;
  onTaskClick?: (task: Task) => void;
  isDragging?: boolean;
  overlay?: boolean;
}

export default function TaskCard({
  task,
  onTaskClick,
  isDragging = false,
  overlay = false,
}: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({
    id: task.id,
    disabled: overlay,
  });

  const style = overlay
    ? {
        transform: CSS.Transform.toString({ x: 0, y: 0, scaleX: 1, scaleY: 1 }),
        transition: 'transform 200ms ease',
        opacity: 1,
        zIndex: 999,
      }
    : {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isSortableDragging ? 0.4 : 1,
        zIndex: isSortableDragging ? 999 : 1,
      };

  const priorityColors = {
    low: 'bg-green-100 text-green-800 hover:bg-green-100',
    medium: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
    high: 'bg-red-100 text-red-800 hover:bg-red-100',
  };

  const priorityLabels = {
    low: '낮음',
    medium: '중간',
    high: '높음',
  };

  return (
    <Card
      ref={overlay ? undefined : setNodeRef}
      style={style}
      className={`${
        overlay ? 'shadow-xl' : 'cursor-grab active:cursor-grabbing'
      } ${isDragging || isSortableDragging ? 'shadow-lg' : ''}`}
      onClick={() => !overlay && onTaskClick && onTaskClick(task)}
    >
      <CardContent className="p-3">
        <div className="flex items-start gap-2">
          {!overlay && (
            <div
              {...attributes}
              {...listeners}
              className="mt-1 text-muted-foreground touch-manipulation"
              onClick={(e) => e.stopPropagation()}
            >
              <GripVertical size={16} />
            </div>
          )}
          <div className="flex-1 space-y-2">
            <div className="font-medium">{task.title}</div>
            {task.description && (
              <div className="text-sm text-muted-foreground">
                {task.description}
              </div>
            )}
            <div className="flex items-center justify-between">
              <Badge
                variant="outline"
                className={priorityColors[task.priority]}
              >
                {priorityLabels[task.priority]}
              </Badge>
              {task.dueDate && (
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar size={12} className="mr-1" />
                  {new Date(task.dueDate).toISOString().slice(0, 10)}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
