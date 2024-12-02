import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserWithoutPassword } from './entities/user_without_password.entity';
import { JWTUserPayload } from './entities/jwt_user_payload.entity';
import { ExistingUserException } from './exceptions/existing_user.exception';
import { User } from 'src/user/entities/user.entity';
import { Nucleo } from 'src/nucleo/entities/nucleo.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async login(user: UserWithoutPassword) {
        const payload: JWTUserPayload = { email: user.email, sub: user.id };
        return this.jwtService.signAsync(payload);
    }

    async validateUser(email: string, password: string) {
        const { Password, ...user } = await this.userService.findOneByEmail(email);

        return await new Promise<typeof user | null>((resolve) => {
            compare(password, Password.hash, (err, result) => {
                if (result) {
                    resolve(user);
                }
                resolve(null);
            });
        });
    }

    async register(email: string, name: string, nucleo: Nucleo, password: string) {
        //Verify is exist the user
        let check_user: User;
        try {
            check_user = await this.userService.findOneByEmail(email);
        } catch (e) {
            check_user = null;
        }
        if (check_user) throw new ExistingUserException();

        const user = await this.userService.create({
            name,
            email,
            nucleo,
            password,
        });

        const payload: JWTUserPayload = { email: user.email, sub: user.id.toString() };
        return this.jwtService.signAsync(payload);
    }

    async change_password(id: number, prev_pw: string, new_pw: string) {
        return this.userService.updatePassword(id, prev_pw, new_pw);
    }
}
