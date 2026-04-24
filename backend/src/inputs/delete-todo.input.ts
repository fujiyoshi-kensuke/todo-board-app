import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class DeleteTodoInput {
    @Field(() => Int)
    id!: number;
}