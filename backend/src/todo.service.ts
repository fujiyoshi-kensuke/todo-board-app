import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
    constructor(private readonly prismaService: PrismaService) {}

    async getTodos() {
        return this.prismaService.todo.findMany({
            orderBy: { id: 'asc' },
        });
    }

    async createTodo(body: CreateTodoDto) {
        return await this.prismaService.todo.create({
            data: {
                title: body.title,
                dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
                status: body.status as Prisma.TodoCreateInput['status'],
            },
        });
    }

    async updateTodo(id: number, body: UpdateTodoDto) {
        const data: Prisma.TodoUpdateInput = {};

        if (body.title !== undefined) {
            data.title = body.title;
        }

        if (body.dueDate !== undefined) {
            data.dueDate = new Date(body.dueDate);
        }

        if (body.status !== undefined) {
            data.status = body.status as Prisma.TodoUpdateInput['status'];
        }

        try {
            return await this.prismaService.todo.update({
                where: { id },
                data,
            });
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2025'
            ) {
                throw new NotFoundException(`Todo with id ${id} not found`);
            }
            throw error;
        }
    }

    async deleteTodo(id: number) {
        try {
            return await this.prismaService.todo.delete({
                where: { id },
            });
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2025'
            ) {
                throw new NotFoundException(`Todo with id ${id} not found`);
            }
            throw error;
        }
    }
}