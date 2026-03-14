import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service'; // Ajuste o caminho se necessário
import * as bcrypt from 'bcrypt'; // 1. Importa o bcrypt

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    // 2. Gera o "sal" (tempero de segurança) e o hash
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.senha, salt);

    // 3. Substitui a senha limpa pela senha com hash
    const userToSave = {
      ...createUserDto,
      senha: hashedPassword,
      dataNascimento: new Date(`${createUserDto.dataNascimento}T00:00:00Z`),
    };

    return this.prisma.users.create({
      data: userToSave,
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
