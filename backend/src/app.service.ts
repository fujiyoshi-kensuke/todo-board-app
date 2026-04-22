import { Injectable } from '@nestjs/common';
import { PrismaService} from './prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}
  getHello(): string {
    return 'Hello World!';
  }
  async getTodos() {
    const result = await this.prismaService.todo.findMany();
    return result;
  }

  async createTodo(){
    return await this.prismaService.todo.create({
      data: {
        title: 'first todo',
      }
    });
  }
}
