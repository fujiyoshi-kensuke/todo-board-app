import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class DeleteTodoInput {
  @Field(() => Int)
  @IsInt()
  id!: number;
}