import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectsAPI, AddProjectData } from '../services/api';

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => projectsAPI.list().then(res => res.data),
  });
};

export const useAddProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: AddProjectData) => projectsAPI.add(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: AddProjectData }) => 
      projectsAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => projectsAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};
