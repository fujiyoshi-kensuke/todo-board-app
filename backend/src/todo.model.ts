import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Todo {
    @Field(() => Int)
    id!: number;

    @Field()
    title!: string;

    @Field(() => String, { nullable: true })
    description!: string | null;

    @Field()
    status!: string;

    @Field(() => Date, {nullable: true})
    dueDate!:Date | null;

    @Field()
    createdAt!: Date;

    @Field()
    updatedAt!: Date;
}