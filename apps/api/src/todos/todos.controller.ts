import { Controller } from '@nestjs/common';
import { TodosService } from './todos.service';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { APIContract } from '@mono-repo/ts-rest';

@Controller('')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @TsRestHandler(APIContract.Todo.getAll)
  getTodos() {
    return tsRestHandler(APIContract.Todo.getAll, async () => {
      const todos = await this.todosService.getAll();
      return {
        status: 200,
        body: todos,
      };
    });
  }

  @TsRestHandler(APIContract.Todo.create)
  createTodo() {
    return tsRestHandler(APIContract.Todo.create, async ({ body }) => {
      const todo = await this.todosService.create({ id: 2, ...body });
      return {
        status: 201,
        body: todo,
      };
    });
  }

  @TsRestHandler(APIContract.Todo.delete)
  deleteTodo() {
    return tsRestHandler(APIContract.Todo.delete, async ({ params }) => {
      const todo = await this.todosService.delete(params.id);

      return {
        status: 202,
        body: null,
      };
    });
  }
}
