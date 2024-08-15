import { Todo } from '@mono-repo/ts-rest';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TodosService {

    private todos = [
        { id: 1, title: 'Sample Todo', description: 'This is a sample todo' }
      ];

    getAll(){
        return this.todos;
    }

    create(todo: Todo){
        this.todos.push(todo)
        return todo;
    }
}
