import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';
import { CreateTodoInput } from './inputs/create-todo.input';
import { UpdateTodoInput } from './inputs/update-todo.input';

@Resolver(() => Todo)
export class TodoResolver {
    constructor(private readonly todoService: TodoService) {}

    @Query(() => [Todo])
    todos(): Promise<Todo[]> {
        return this.todoService.getTodos();
    }

    @Mutation(() => Todo)
    createTodo(
    @Args('input', { type: () => CreateTodoInput }) input: CreateTodoInput,
    ): Promise<Todo> {
    console.log('create input =', input);
    console.log('create input.title =', input?.title);
    return this.todoService.createTodo(input);
    }

    @Mutation(() => Todo)
    updateTodo(
    @Args('input', { type: () => UpdateTodoInput }) input: UpdateTodoInput,
    ): Promise<Todo> {
    return this.todoService.updateTodo(input.id, {
        title: input.title,
        completed: input.completed,
    });
    }

    @Mutation(() => Todo)
    deleteTodo(
        @Args('id', { type: () => Int }) id: number
    ): Promise<Todo> {
        return this.todoService.deleteTodo(id);
    }
}