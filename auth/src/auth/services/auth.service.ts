import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { User } from 'src/users/models/users.interface';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService
    ){}

    generateJwt(user: User): string {
        return this.jwtService.sign({user});
    }

    hashPassword(password: string): Promise<string>{
        return bcrypt.hash(password, 12);
    }

    comparePasswords(newPass: string, passHash: string): Promise<boolean> {
        return bcrypt.compare(newPass, passHash);
    }
}
