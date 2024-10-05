'use client';

import { useState, useEffect } from 'react';
import type { Task } from '@/components/projects/TaskDashboard';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface SearchTasksDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export default function SearchTasksDialog({
  open,
  onOpenChange,
  tasks,
  onTaskClick,
}: SearchTasksDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Task[]>([]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        (task.description && task.description.toLowerCase().includes(query))
    );

    setSearchResults(results);
  }, [searchQuery, tasks]);

  const handleTaskClick = (task: Task) => {
    onTaskClick(task);
    onOpenChange(false);
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>작업 검색</DialogTitle>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="작업 제목이나 설명으로 검색..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        </div>

        <div className="mt-4 max-h-[400px] overflow-y-auto">
          {searchResults.length > 0 ? (
            <ul className="space-y-2">
              {searchResults.map((task) => (
                <li
                  key={task.id}
                  className="border rounded-md p-3 hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => handleTaskClick(task)}
                >
                  <div className="flex flex-col gap-2">
                    <div className="font-medium">{task.title}</div>
                    {task.description && (
                      <div className="text-sm text-muted-foreground line-clamp-2">
                        {task.description}
                      </div>
                    )}
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <Badge
                        variant="outline"
                        className={priorityColors[task.priority]}
                      >
                        {priorityLabels[task.priority]}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={statusColors[task.status]}
                      >
                        {statusLabels[task.status]}
                      </Badge>
                      {task.dueDate && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar size={12} className="mr-1" />
                          {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : searchQuery ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchQuery}에 맞는 작업을 찾을 수 없습니다
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              검색어를 입력하여 작업을 검색하세요
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
