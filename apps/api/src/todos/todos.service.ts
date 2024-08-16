import { Todo } from '@mono-repo/ts-rest';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TodosService {
  private todos = [{ id: 1, title: 'Sample Todo' }];

  getAll() {
    return this.todos;
  }

  create(todo: Todo) {
    this.todos.push(todo);
    return todo;
  }

  delete(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    return this.todos;
  }
}
