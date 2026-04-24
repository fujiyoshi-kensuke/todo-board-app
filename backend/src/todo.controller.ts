import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Get()
    getTodos() {
        return this.todoService.getTodos();
    }

    @Post()
    createTodo(@Body() body: CreateTodoDto) {
        return this.todoService.createTodo(body);
    }

    @Patch(':id')
    updateTodo(@Param('id') id: string, @Body() body: UpdateTodoDto) {
        return this.todoService.updateTodo(Number(id), body);
    }

    @Delete(':id')
    deleteTodo(@Param('id') id: string) {
        return this.todoService.deleteTodo(Number(id));
    }
}