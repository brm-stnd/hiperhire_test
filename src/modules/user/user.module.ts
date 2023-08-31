import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { UsersController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../config/constants';

@Module({
  imports: [JwtModule.register({ secret: jwtConstants.secret })],
  controllers: [UsersController],
  providers: [PrismaService, UserService],
  exports: [UserService],
})
export class UserModule {}
