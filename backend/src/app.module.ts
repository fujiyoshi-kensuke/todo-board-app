import { Module } from '@nestjs/common';
import { TodoModule } from './todo.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
