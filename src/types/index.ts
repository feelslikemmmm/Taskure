export interface Project {
  id: string;
  name: string;
  color: string;
  description?: string;
  createdAt: number;
}

export type Status = 'todo' | 'in-progress' | 'done';

export type Priority = 'low' | 'medium' | 'high';

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  dueDate: string;
  projectId: string;
  userId: string;
  createdAt: number;
};

export type TimeRange = 'all' | 'today' | 'week' | 'month';

export type FilterStatus = 'all' | Status;
export type FilterPriority = 'all' | Priority;
