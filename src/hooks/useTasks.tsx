import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getTasksByUserId,
  addTask as addTaskService,
  updateTask as updateTaskService,
} from '@/lib/service/taskService';
import { Task } from '@/types';

type UseTasksProps = {
  userId: string;
};

export default function useTasks({ userId }: UseTasksProps) {
  const queryClient = useQueryClient();

  const getTasks = useQuery<Task[], Error>({
    queryKey: ['tasks', userId],
    queryFn: () => getTasksByUserId(userId),
    enabled: !!userId,
  });

  const addTask = useMutation({
    mutationFn: addTaskService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', userId] });
    },
  });

  const updateTask = useMutation({
    mutationFn: updateTaskService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', userId] });
    },
  });

  return { getTasks, addTask, updateTask };
}
