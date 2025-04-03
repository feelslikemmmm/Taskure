import { useState } from 'react';
import NewProjectButton from './NewProjectButton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import DashBoardMenuItem from './DashBoardMenuItem';
import ProjectMenuItem from './ProjectMenuItem';
import UserSection from './UserSection';
import ProjectDialog from './ProjectDialog';
import CalendarDialog from './CalendarDialog';

export default function Sidebar() {
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [isCalendarIntegrationOpen, setIsCalendarIntegrationOpen] =
    useState(false);

  return (
    // <div className="w-64 border-r bg-muted/20 flex flex-col h-[calc(100vh-4rem)]">
    <div className="w-64 border-r border-b bg-muted/20 flex flex-col h-100vh">
      <NewProjectButton setIsCreateProjectOpen={setIsCreateProjectOpen} />
      <ScrollArea className="flex-1">
        <DashBoardMenuItem
          setIsCalendarIntegrationOpen={setIsCalendarIntegrationOpen}
        />
        <Separator className="my-2" />
        <ProjectMenuItem setIsCreateProjectOpen={setIsCreateProjectOpen} />
      </ScrollArea>
      <UserSection />
      <ProjectDialog
        open={isCreateProjectOpen}
        onOpenChange={setIsCreateProjectOpen}
      />
      <CalendarDialog
        open={isCalendarIntegrationOpen}
        onOpenChange={setIsCalendarIntegrationOpen}
      />
    </div>
  );
}
