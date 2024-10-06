import { Button } from '@/components/ui/button';
import { useUserStore } from '@/lib/store';
import { Settings, User } from 'lucide-react';
import React from 'react';

export default function UserSection() {
  const user = useUserStore((state) => state.user);

  return (
    <div className="border-t p-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium">{user?.name}</p>
          <p className="text-xs text-muted-foreground">{user?.email}</p>
        </div>
        <Button variant="ghost" size="icon" className="ml-auto">
          <Settings className="h-4 w-4" />
          <span className="sr-only">설정</span>
        </Button>
      </div>
    </div>
  );
}
