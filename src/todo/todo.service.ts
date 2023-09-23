/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from 'src/DTO/create-todo';
import { TodoEntity, TodoStatus } from 'src/Entity/todo.entity';
import { FindOneOptions, Repository } from 'typeorm';


@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity) private repo: Repository<TodoEntity>,
  ) {}

  async getAllTodos() {
    return await this.repo.find();
  }

  async createTodo(createTodoDTO: CreateTodoDto) {
    const todo = new TodoEntity();
    const { title, description } = createTodoDTO;
    todo.title = title;
    todo.description = description;
    todo.status = TodoStatus.OPEN;

    this.repo.create(todo);
    try {
      return await this.repo.save(todo);
    } catch (err) {
      throw new InternalServerErrorException(
        'Something went wrong, todo not created',
      );
    }
  }
  async update(id: number, status: TodoStatus) {
    try {
      
      await this.repo.update(id, { status });
  
      // Find and return the updated record by its id using FindOneOptions
      const findOneOptions: FindOneOptions<TodoEntity> = {
        where: { id },
      };
  
      return this.repo.findOne(findOneOptions);
    } catch (err) {
      
      throw new InternalServerErrorException('Something went wrong');
    }
  }
  async delete(id){
    try {
        return await this.repo.delete({id});
    }catch(err){
        throw new InternalServerErrorException('Something went wrong');
    }
 
  }
}
