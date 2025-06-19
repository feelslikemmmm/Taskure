import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getProjectsByUserId,
  addProject as addProjectService,
} from '@/lib/service/projectService';
import { Project } from '@/types';

export default function useProjects(userId: string) {
  const queryClient = useQueryClient();

  const getProjects = useQuery<Project[], Error>({
    queryKey: ['projects', userId],
    queryFn: () => getProjectsByUserId(userId),
    enabled: !!userId,
  });

  const addProject = useMutation({
    mutationFn: addProjectService,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['projects', userId] as const,
      });
    },
  });

  return { getProjects, addProject };
}
