/* eslint-disable prettier/prettier */
import {  IsNotEmpty,  MaxLength } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @MaxLength(15, { message: 'Title must not be empty and must be no longer than 15 characters' })
  title: string;

  @IsNotEmpty()
  description: string;

}
