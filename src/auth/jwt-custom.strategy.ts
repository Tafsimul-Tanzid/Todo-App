/* eslint-disable prettier/prettier */
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UnauthorizedException } from "@nestjs/common";
import { UserEntity } from "src/Entity/user.entity";

export class JwtCustomStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "LOijtrkljdklsufidsui12jkj43k21l4",
    });
  }

  async validate(payload: { username: string }) {
    const { username } = payload;
    const user = await this.repo.findOne({ where: { username } });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
