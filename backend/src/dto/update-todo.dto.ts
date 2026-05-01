import { IsBoolean, IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateTodoDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsBoolean()
    completed?: boolean;

    @IsOptional()
    @IsDateString()
    dueDate?: string;
}