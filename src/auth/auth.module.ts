/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/Entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtCustomStrategy } from './jwt-custom.strategy';


const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });
@Module({
    imports:[
        TypeOrmModule.forFeature([UserEntity]),
        passportModule,
        JwtModule.register({
            secret: 'LOijtrkljdklsufidsui12jkj43k21l4',
            signOptions: {
                algorithm: 'HS512',
                expiresIn: '1d'
            }
        }),
        PassportModule.register({
            defaultStrategy:'jwt'
        })
    ],
  providers: [AuthService,JwtCustomStrategy],
  controllers: [AuthController],
  exports: [passportModule, JwtCustomStrategy]
})
export class AuthModule {}
