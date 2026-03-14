import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Opcional: Torna o PrismaService disponível em todo o app sem precisar importar em cada módulo
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // ESSENCIAL: Permite que outros módulos usem o PrismaService
})
export class PrismaModule {}
