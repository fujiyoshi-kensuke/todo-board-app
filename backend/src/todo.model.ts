import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Todo {
    @Field(() => Int)
    id!: number;

    @Field()
    title!: string;

    @Field()
    status!: string;

    @Field(() => Date, {nullable: true})
    dueDate!:Date | null;

    @Field()
    createdAt!: Date;

    @Field()
    updatedAt!: Date;
}