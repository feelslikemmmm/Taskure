import { Filter, Search } from 'lucide-react';
import React, { Dispatch, SetStateAction } from 'react';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FilterPriority, FilterStatus, Project } from '@/types';

interface TasksFilterSectionProps {
  projects: Project[];
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  statusFilter: FilterStatus;
  setStatusFilter: Dispatch<SetStateAction<FilterStatus>>;
  priorityFilter: FilterPriority;
  setPriorityFilter: Dispatch<SetStateAction<FilterPriority>>;
  projectFilter: string;
  setProjectFilter: Dispatch<SetStateAction<string>>;
}

export default function TasksFilterSection({
  projects,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  projectFilter,
  setProjectFilter,
}: TasksFilterSectionProps) {
  console.log('statusFilter', statusFilter);
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="작업 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as FilterStatus)}
        >
          <SelectTrigger className="w-[130px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="상태" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">모든 상태</SelectItem>
            <SelectItem value="todo">할 일</SelectItem>
            <SelectItem value="in-progress">진행 중</SelectItem>
            <SelectItem value="done">완료</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={priorityFilter}
          onValueChange={(value) => setPriorityFilter(value as FilterPriority)}
        >
          <SelectTrigger className="w-[130px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="우선순위" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">모든 우선순위</SelectItem>
            <SelectItem value="low">낮음</SelectItem>
            <SelectItem value="medium">중간</SelectItem>
            <SelectItem value="high">높음</SelectItem>
          </SelectContent>
        </Select>

        <Select value={projectFilter} onValueChange={setProjectFilter}>
          <SelectTrigger className="w-[130px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="프로젝트" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">모든 프로젝트</SelectItem>
            {projects?.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
