import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class UpdateTodoInput {
    @Field(() => Int)
    id!: number;

    @Field({ nullable: true })
    title?: string;

    @Field({ nullable: true })
    completed?: boolean;
}