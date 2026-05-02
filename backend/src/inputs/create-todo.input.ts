import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional, IsDateString, IsIn } from 'class-validator';

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

  @Field({ nullable: true })
  @IsOptional()
  @IsIn(['TODO', 'DOING', 'DONE'])
  status?: string;
}