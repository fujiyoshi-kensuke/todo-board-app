import { IsOptional, IsString, IsDateString, IsIn } from 'class-validator';

export class UpdateTodoDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsDateString()
    dueDate?: string;

    @IsOptional()
    @IsIn(['TODO', 'DOING', 'DONE'])
    status?: string;
}