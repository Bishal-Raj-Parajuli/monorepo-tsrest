import apiClient from '@/common/api-client';
import { Todo } from '@mono-repo/ts-rest';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const listTodoKey = () => ['todo'];

export const useListResume = () => {
  return useQuery({
    queryKey: listTodoKey(),
    queryFn: async () => {
      const resp = await apiClient.Todo.getAll();
      if (resp.status !== 200) {
        throw new Error('Something went wrong');
      }
      return resp.body;
    },
  });
};

export const useCreateResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Todo) => {
      const resp = await apiClient.Todo.create({
        body: data,
      });
      if (resp.status !== 201) {
        throw new Error('Something went wrong ' + resp.status);
      }
      return resp;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: listTodoKey(),
      });
    },
    onError: (error) => {
      console.error('Something wen wrong ' + error.message);
    },
  });
};

export const useDeleteResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (todoId: number) => {
      const resp = await apiClient.Todo.delete({
        params: {
          id: todoId,
        },
      });
      if (resp.status !== 202) {
        throw new Error('Something went worng');
      }
      return resp;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: listTodoKey(),
      });
    },
    onError: (err) => console.error(err.message),
  });
};
