'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useUserStore } from '@/lib/store';
import useProjects from '@/hooks/useProjects';
import { colorOptions } from '@/constants/colorOptions';

interface CreateProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProjectDialog({
  open,
  onOpenChange,
}: CreateProjectDialogProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const user = useUserStore((state) => state.user);

  const {
    addProject: { mutate: addProject, isPending },
  } = useProjects(user?.uid ?? '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addProject(
      {
        name,
        description,
        color: selectedColor,
        createdAt: Date.now(),
      },
      {
        onSuccess: () => {
          setName('');
          setDescription('');
          setSelectedColor(colorOptions[0]);
          onOpenChange(false);
        },
        onError: () => {
          console.error('생성 실패');
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>새 프로젝트 생성</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">프로젝트 이름</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="프로젝트 이름 입력"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">설명 (선택사항)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="프로젝트에 대한 간략한 설명"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>프로젝트 색상</Label>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`w-8 h-8 rounded-full transition-all ${
                      selectedColor === color
                        ? 'ring-2 ring-offset-2 ring-primary'
                        : ''
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`색상 선택 ${color}`}
                  />
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              className="cursor-pointer"
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              취소
            </Button>
            <Button
              className="cursor-pointer"
              type="submit"
              disabled={isPending}
            >
              {isPending ? '생성 중...' : '생성'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
