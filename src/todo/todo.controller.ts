/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {

    constructor( private todoservice: TodoService){}

    @Get()
    getAllTodos(){
    // console.log(this.todoservice.getAllTodos());
    return this.todoservice.getAllTodos();
    }

    @Post()
    createNewTodo(@Body() data){
        const {title, description}=data;
  return this.todoservice.createTodo(title, description);
    }
}

