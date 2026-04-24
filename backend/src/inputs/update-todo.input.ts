import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString, IsBoolean } from 'class-validator';

@InputType()
export class UpdateTodoInput {
  @Field(() => Int)
  @IsInt()
  id!: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}