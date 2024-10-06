import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar, SortAsc, SortDesc } from 'lucide-react';
import { Project, Task } from '@/types';
import {
  PRIORITY_COLORS,
  PRIORITY_LABELS,
  STATUS_COLORS,
  STATUS_LABELS,
} from '@/constants/tasksTable';
import { Dispatch, SetStateAction } from 'react';

interface TasksTableSectionProps {
  handleSort: (field: keyof Task) => void;
  sortField: keyof Task;
  sortDirection: 'asc' | 'desc';
  filteredTasks: Task[];
  projects: Project[];
  setSelectedTask: Dispatch<SetStateAction<Task | null>>;
}

export default function TasksTableSection({
  handleSort,
  sortField,
  sortDirection,
  filteredTasks,
  setSelectedTask,
  projects,
}: TasksTableSectionProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort('title')}
            >
              제목
              {sortField === 'title' &&
                (sortDirection === 'asc' ? (
                  <SortAsc className="inline ml-1 h-4 w-4" />
                ) : (
                  <SortDesc className="inline ml-1 h-4 w-4" />
                ))}
            </TableHead>
            <TableHead>상태</TableHead>
            <TableHead>우선순위</TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort('dueDate')}
            >
              마감일
              {sortField === 'dueDate' &&
                (sortDirection === 'asc' ? (
                  <SortAsc className="inline ml-1 h-4 w-4" />
                ) : (
                  <SortDesc className="inline ml-1 h-4 w-4" />
                ))}
            </TableHead>
            <TableHead>프로젝트</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TableRow
                key={task.id}
                className="cursor-pointer"
                onClick={() => setSelectedTask(task)}
              >
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={STATUS_COLORS[task.status]}
                  >
                    {STATUS_LABELS[task.status]};
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={PRIORITY_COLORS[task.priority]}
                  >
                    {PRIORITY_LABELS[task.priority]}
                  </Badge>
                </TableCell>
                <TableCell>
                  {task.dueDate ? (
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      {new Date(task.dueDate).toISOString().slice(0, 10)}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">없음</span>
                  )}
                </TableCell>
                <TableCell>
                  {task.projectId ? (
                    <div className="flex items-center">
                      <span
                        className="h-2 w-2 rounded-full mr-2"
                        style={{
                          backgroundColor: projects?.find(
                            (p) => p.id === task.projectId
                          )?.color,
                        }}
                      ></span>
                      {projects?.find((p) => p.id === task.projectId)?.name ||
                        '알 수 없음'}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">없음</span>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                검색 결과가 없습니다
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
