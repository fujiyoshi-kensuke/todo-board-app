import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { PrismaService } from './prisma.service';
import { TodoResolver } from './todo.resolver';

@Module({
    controllers: [TodoController],
    providers: [TodoService, PrismaService, TodoResolver],
})
export class TodoModule {}