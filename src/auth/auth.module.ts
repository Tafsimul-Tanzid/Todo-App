/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/Entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports:[
        TypeOrmModule.forFeature([UserEntity]),
        JwtModule.register({
            secret: 'tokmdgavcfhjvadcualctyrif',
            signOptions: {
                algorithm: 'HS512',
                expiresIn: 'id'
            }
        }),
        PassportModule.register({
            defaultStrategy:'jwt'
        })
    ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
