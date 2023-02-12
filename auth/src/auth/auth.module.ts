import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports:    [ConfigModule],
            inject:     [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get("JWT_SECRET") || "SECRET",
                signOptions: {expiresIn: '2h'}
            })
        })
    ],
    providers: [AuthService],
    exports: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {}
