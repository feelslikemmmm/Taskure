import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
interface TasksHeaderProps {
  setIsAddTaskOpen: (isOpen: boolean) => void;
}

export default function TasksHeader({ setIsAddTaskOpen }: TasksHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">모든 작업</h1>
      <Button onClick={() => setIsAddTaskOpen(true)}>
        <PlusCircle className="mr-2 h-4 w-4" />
        작업 추가
      </Button>
    </div>
  );
}
