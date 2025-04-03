import { Button } from '@/components/ui/button';
import { FolderPlus } from 'lucide-react';
import React, { Dispatch, SetStateAction } from 'react';

interface NewProjectProps {
  setIsCreateProjectOpen: Dispatch<SetStateAction<boolean>>;
}

export default function NewProjectButton({
  setIsCreateProjectOpen,
}: NewProjectProps) {
  return (
    <div className="p-4">
      <Button
        variant="outline"
        className="w-full justify-start cursor-pointer"
        onClick={() => setIsCreateProjectOpen(true)}
      >
        <FolderPlus className="mr-2 h-4 w-4" />새 프로젝트
      </Button>
    </div>
  );
}
