import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';

@Resolver(() => Todo)
export class TodoResolver {
    constructor(private readonly todoService: TodoService) {}

    @Query(() => [Todo])
    todos(): Promise<Todo[]> {
        return this.todoService.getTodos();
    }

    @Mutation(() => Todo)
    createTodo(
        @Args('title') title: string,
    ): Promise<Todo> {
        return this.todoService.createTodo({ title });
    }

    @Mutation(() => Todo)
    updateTodo(
        @Args('id', { type: () => Int }) id: number,
        @Args('title', { nullable: true }) title?: string,
        @Args('completed', { nullable: true }) completed?: boolean,
    ): Promise<Todo> {
        return this.todoService.updateTodo(id, {
            title,
            completed,
        });
    }

    @Mutation(() => Todo)
    deleteTodo(
        @Args('id', { type: () => Int }) id: number,
    ): Promise<Todo> {
        return this.todoService.deleteTodo(id);
    }
}