/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { TodoService } from "./todo.service";
import { CreateTodoDto } from "src/DTO/create-todo";
import { TodoStatus } from "src/Entity/todo.entity";
import { TodoStatusValidationPipe } from "src/pipes/TodoStatusValidation.pipe";
import { AuthGuard } from "@nestjs/passport";
import { User } from "src/auth/user.decorator";
import { UserEntity } from "src/Entity/user.entity";

@Controller("todos")
@UseGuards(AuthGuard("jwt"))
export class TodoController {
  constructor(private todoservice: TodoService) {}

  @Get()
  getAllTodos(
    @User() user: UserEntity
    ) {
    // console.log(this.todoservice.getAllTodos());
    return this.todoservice.getAllTodos(user);
    
  }

  @Post()
  createNewTodo(@Body(ValidationPipe) data: CreateTodoDto, 
  @User() user: UserEntity
  ) {
    return this.todoservice.createTodo(data,user);
  }

  @Patch(":id")
  updateTodo(
    @Body("status", TodoStatusValidationPipe) status: TodoStatus,
    @Param("id") id: number,
    @User() user: UserEntity
  ) {
    return this.todoservice.update(id, status, user);
  }
  @Delete(":id")
  deleteTodo(@Param("id") id: number,
  @User() user: UserEntity) {
    return this.todoservice.delete(id, user);
  }
}
