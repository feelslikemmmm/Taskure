'use client';

import { Button } from '@/components/ui/button';
import { useDashboardStore } from '@/lib/store';
import { Calendar, Home, ListTodo, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { Dispatch, SetStateAction } from 'react';

interface SidebaMenuItemProps {
  setIsCalendarIntegrationOpen: Dispatch<SetStateAction<boolean>>;
}

export default function SidebarDashboardMenuItem({
  setIsCalendarIntegrationOpen,
}: SidebaMenuItemProps) {
  const router = useRouter();
  const setActiveProjectId = useDashboardStore(
    (state) => state.setActiveProjectId
  );
  const setIsSerchOpen = useDashboardStore((state) => state.setIsSearchOpen);

  return (
    <div className="px-3 py-2">
      <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
        대시보드
      </h2>
      <div className="space-y-1">
        <Button
          variant="ghost"
          className="w-full justify-start cursor-pointer"
          onClick={() => {
            setActiveProjectId(null);
            router.push('/dashboard');
          }}
        >
          <Home className="mr-2 h-4 w-4" />
          개요
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start cursor-pointer"
          onClick={() => setIsCalendarIntegrationOpen(true)}
        >
          <Calendar className="mr-2 h-4 w-4" />
          캘린더
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start cursor-pointer"
          onClick={() => router.push('/dashboard/tasks')}
        >
          <ListTodo className="mr-2 h-4 w-4" />
          모든 작업
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start cursor-pointer"
          onClick={() => setIsSerchOpen(true)}
        >
          <Search className="mr-2 h-4 w-4" />
          검색
        </Button>
      </div>
    </div>
  );
}
