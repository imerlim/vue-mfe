import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module'; // Importante!

@Module({
  imports: [PrismaModule], // Adicione aqui
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
