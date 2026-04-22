import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('todos')
  getTodos() {
    return this.appService.getTodos();
  }

  @Post('todos')
  createTodo() {
    return this.appService.createTodo();
  }
}
