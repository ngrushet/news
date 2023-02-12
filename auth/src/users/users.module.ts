import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { UserEntity } from './models/users.entity';
import { RoleModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    RoleModule,
    AuthModule
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
