import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
    constructor(private readonly prismaService: PrismaService) {}

    async getTodos() {
        return this.prismaService.todo.findMany();
    }

    async createTodo(body: CreateTodoDto) {
        return await this.prismaService.todo.create({
            data: {
                title: body.title,
            }
        })
    }

    async updateTodo(id: string, body: UpdateTodoDto) {
        try {
            return await this.prismaService.todo.update({
                where: {
                    id: Number(id),
                },
                data: {
                    completed: body.completed,
                }
            })
        } catch (error) {
            if(
                error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025'
            ) {
                throw new NotFoundException(`Todo with id ${id} not found`);
            }
            throw error;
        }
    }

    async deleteTodo(id: string) {
        try {
            return await this.prismaService.todo.delete({

            where: {
                id: Number(id)
            }
        })
        } catch (error) {
            if(
                error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025'
            ) {
                throw new NotFoundException(`Todo with id ${id} not found`);
            }
            throw error;
        }
    }
}