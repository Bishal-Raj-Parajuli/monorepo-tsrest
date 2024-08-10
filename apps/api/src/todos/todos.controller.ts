import { Body, Controller } from '@nestjs/common';
import { TodosService } from './todos.service';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { contract, Todo } from '@mono-repo/ts-rest';
import { async } from 'rxjs';


@Controller('')
export class TodosController {

  constructor(private readonly todosService: TodosService) {}

  @TsRestHandler(contract.routes.getAll)
  getTodos(){
    return tsRestHandler(contract.routes.getAll,async () => {
      const todos = await this.todosService.getAll();
      return {
        status: 200,
        body: todos
      }
    })
  }

  @TsRestHandler(contract.routes.create)
  createTodo(){
    return tsRestHandler(contract.routes.create, async ({body}) => {
      const todo = await this.todosService.create({id: 2, ...body})
      return {
        status: 201,
        body: todo
      }
    })
  }

}
