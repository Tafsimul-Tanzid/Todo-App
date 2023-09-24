/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { use } from 'passport';
import { NotFoundError } from 'rxjs';
import { CreateTodoDto } from 'src/DTO/create-todo';
import { TodoEntity, TodoStatus } from 'src/Entity/todo.entity';
import { UserEntity } from 'src/Entity/user.entity';
import { User } from 'src/auth/user.decorator';
import { FindOneOptions, Repository } from 'typeorm';


@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity) private repo: Repository<TodoEntity>,
  ) {}

  async getAllTodos(user: UserEntity) {
    const query = await this.repo.createQueryBuilder('todo');
    query.where(`todo.userId = :userId`, {userId: user.id});
    try {
     return await query.getMany();
    }catch(err){
      throw new NotFoundException('no Todo Found');
    }
    // return await this.repo.find();
  }

  async createTodo(createTodoDTO: CreateTodoDto, user:UserEntity) {
    const todo = new TodoEntity();
    const { title, description } = createTodoDTO;
    todo.title = title;
    todo.description = description;
    todo.status = TodoStatus.OPEN;
    todo.userId = user.id;

    this.repo.create(todo);
    try {
      return await this.repo.save(todo);
    } catch (err) {
      throw new InternalServerErrorException(
        'Something went wrong, todo not created',
      );
    }
  }
  async update(id: number, status: TodoStatus, user: UserEntity) {
    try {
      await this.repo.update({ id, userId: user.id }, { status });
      return this.repo.findOne({ where: { id } }); 
    } catch (err) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }
  
  async delete(id:number , user: UserEntity){
    const result = await this.repo.delete({id, userId:user.id});
   if(result.affected===0){
    throw new NotFoundException("Todo Not Deleted");
   }else{
    return {success: true};
   }
    /*  try {
        return await this.repo.delete({id});
    }catch(err){
        throw new InternalServerErrorException('Something went wrong');
    } */
 
  }
}
