/* eslint-disable prettier/prettier */

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('todos')
export class TodoEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column()
    status :TodoStatus

    @ManyToOne(()=>UserEntity, (user:UserEntity)=>user.Todos)
    user:UserEntity

    @Column()
    userId: number;
    
}
export enum TodoStatus{
   OPEN ='OPEN',
   WIP ='WIP',
   COMPLETED = 'COMPLETED'
}