import { Module } from '@nestjs/common';
import { RoleService } from './services/roles.service';
import { RoleController } from './controllers/roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { RoleEntity } from './models/roles.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity])
  ],
  providers: [RoleService],
  controllers: [RoleController],
  exports: [RoleService]
})
export class RoleModule {}
