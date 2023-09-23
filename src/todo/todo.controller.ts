/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from 'src/DTO/create-todo';
import { TodoStatus } from 'src/Entity/todo.entity';
import { TodoStatusValidationPipe } from 'src/pipes/TodoStatusValidation.pipe';
import { AuthGuard } from '@nestjs/passport';


@Controller('todos')
@UseGuards(AuthGuard())
export class TodoController {

    constructor( private todoservice: TodoService){}

    @Get()
    getAllTodos(){
    // console.log(this.todoservice.getAllTodos());
    return this.todoservice.getAllTodos();
    }

    @Post()
    createNewTodo(@Body(ValidationPipe) data : CreateTodoDto){
    return this.todoservice.createTodo(data);
    }


    @Patch(':id')
  updateTodo(
    @Body('status', TodoStatusValidationPipe) status: TodoStatus,
    @Param('id') id: number
  ) {
      return this.todoservice.update(id, status);
  }
  @Delete(':id')
  deleteTodo(@Param('id') id: number){
    return this.todoservice.delete(id);
  }
}

