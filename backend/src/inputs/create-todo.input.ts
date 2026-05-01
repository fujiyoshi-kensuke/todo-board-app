import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

@InputType()
export class CreateTodoInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  title!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  dueDate?: string;
}