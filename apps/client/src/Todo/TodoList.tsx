import { Button } from '@/shadcn/components/ui/button';
import { Input } from '@/shadcn/components/ui/input';
import { Trash } from 'lucide-react';
import {
  useCreateResume,
  useDeleteResume,
  useListResume,
} from './hooks/useTodo';
import { useState } from 'react';

export default function TodoList() {
  const [todo, setTodo] = useState('');
  const todoList = useListResume();
  const createTodo = useCreateResume();
  const deleteTodo = useDeleteResume();

  const handleCreate = () => {
    createTodo.mutate({
      id: 2,
      title: todo,
    });
    setTodo('');
  };

  const handleDelete = (id: number) => {
    deleteTodo.mutate(id);
  };

  if (!todoList.data) return <>Loading...</>;

  return (
    <>
      <div className="flex justify-center items-center my-8">
        <div className="flex w-1/4">
          <Input
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            type="text"
            placeholder="Add Todo"
          />
          <span>
            <Button onClick={handleCreate}>Add</Button>
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center">
        {todoList.data.map((todo) => (
          <span
            key={todo.id}
            className="w-[25%] flex justify-between rounded-lg p-2 border-2 border-gray-200 "
          >
            <span>{todo.title}</span>
            <span
              onClick={() => {
                handleDelete(todo.id);
              }}
            >
              <Trash className="text-red-500" />
            </span>
          </span>
        ))}
      </div>
    </>
  );
}
