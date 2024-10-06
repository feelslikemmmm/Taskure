'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Task } from '@/types';
import {
  priorityColors,
  priorityLabels,
  statusColors,
  statusLabels,
} from '@/constants/tasksTable';
import { UseMutateFunction } from '@tanstack/react-query';

interface TaskDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task | null;
  onUpdateTask: UseMutateFunction<Task, Error, Task, unknown>;
}

export default function TaskDetailDialog({
  open,
  onOpenChange,
  task,
  onUpdateTask,
}: TaskDetailDialogProps) {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(task!.title ?? '');
  const [description, setDescription] = useState(task!.description || '');
  const [status, setStatus] = useState<Task['status']>(task!.status);
  const [priority, setPriority] = useState<Task['priority']>(task!.priority);
  const [dueDate, setDueDate] = useState(task!.dueDate || '');

  console.log('tasktitle', title);

  const handleSave = () => {
    const updatedTask: Task = {
      ...task!,
      title,
      description: description || undefined,
      status,
      priority,
      dueDate: dueDate,
    };

    onUpdateTask(updatedTask, {
      onSuccess: () => {
        setEditMode(false);
        onOpenChange(false);
      },
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!task) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{editMode ? '작업 편집' : '작업 상세'}</DialogTitle>
        </DialogHeader>

        {editMode ? (
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">제목</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="작업 제목"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">설명</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="작업 설명"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">상태</Label>
                <Select
                  value={status}
                  onValueChange={(value: Task['status']) => setStatus(value)}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="상태 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">{statusLabels.todo}</SelectItem>
                    <SelectItem value="in-progress">
                      {statusLabels['in-progress']}
                    </SelectItem>
                    <SelectItem value="done">{statusLabels.done}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">우선순위</Label>
                <Select
                  value={priority}
                  onValueChange={(value: Task['priority']) =>
                    setPriority(value)
                  }
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="우선순위 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">{priorityLabels.low}</SelectItem>
                    <SelectItem value="medium">
                      {priorityLabels.medium}
                    </SelectItem>
                    <SelectItem value="high">{priorityLabels.high}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">마감일</Label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">{task?.title}</h3>

            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className={statusColors[task?.status]}>
                {statusLabels[task?.status]}
              </Badge>
              <Badge
                variant="outline"
                className={priorityColors[task?.priority]}
              >
                {priorityLabels[task?.priority]} 우선순위
              </Badge>
            </div>

            {task?.dueDate && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                마감일: {formatDate(task?.dueDate)}
              </div>
            )}

            <div className="pt-2">
              <h4 className="text-sm font-medium mb-2">설명</h4>
              <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md min-h-[100px]">
                {task?.description || '설명이 없습니다.'}
              </div>
            </div>

            <div className="flex items-center text-xs text-muted-foreground pt-2">
              <Clock className="mr-1 h-3 w-3" />
              생성일: {formatDate(new Date().toISOString())}
            </div>
          </div>
        )}

        <DialogFooter>
          {editMode ? (
            <>
              <Button variant="outline" onClick={() => setEditMode(false)}>
                취소
              </Button>
              <Button onClick={handleSave}>변경사항 저장</Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                닫기
              </Button>
              <Button onClick={() => setEditMode(true)}>작업 편집</Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
