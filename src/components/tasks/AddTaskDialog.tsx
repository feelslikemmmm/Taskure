'use client';

import { useState } from 'react';
import { Task, Project } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import useTasks from '@/hooks/useTasks';
import { useUserStore } from '@/lib/store';

interface AddTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projects: Project[];
}

export default function AddTaskDialog({
  open,
  onOpenChange,
  projects,
}: AddTaskDialogProps) {
  const user = useUserStore((state) => state.user);
  const userId = user?.uid ?? '';

  const [form, setForm] = useState<Omit<Task, 'id' | 'userId' | 'createdAt'>>({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    dueDate: '',
    projectId: '',
  });

  const {
    addTask: { mutate: addTask, isPending },
  } = useTasks({ userId });

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask(form, {
      onSuccess: () => {
        onOpenChange(false);
        setForm({
          title: '',
          description: '',
          status: 'todo',
          priority: 'medium',
          dueDate: '',
          projectId: '',
        });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 작업 추가</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>제목</Label>
            <Input
              value={form.title}
              onChange={(e) => handleChange('title', e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>설명</Label>
            <Textarea
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>상태</Label>
              <Select
                value={form.status}
                onValueChange={(val) => handleChange('status', val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="상태" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">할 일</SelectItem>
                  <SelectItem value="in-progress">진행 중</SelectItem>
                  <SelectItem value="done">완료</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>우선순위</Label>
              <Select
                value={form.priority}
                onValueChange={(val) => handleChange('priority', val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="우선순위" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">낮음</SelectItem>
                  <SelectItem value="medium">중간</SelectItem>
                  <SelectItem value="high">높음</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>프로젝트</Label>
            <Select
              value={form.projectId}
              onValueChange={(val) => handleChange('projectId', val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="프로젝트 선택" />
              </SelectTrigger>
              <SelectContent>
                {projects?.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>마감일</Label>
            <Input
              type="date"
              value={form.dueDate}
              onChange={(e) => handleChange('dueDate', e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              취소
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? '추가 중...' : '추가'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
