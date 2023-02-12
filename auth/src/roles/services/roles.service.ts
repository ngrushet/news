import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { RoleEntity } from '../models/roles.entity';
import { Role } from '../models/roles.interface';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleEntity)
        private readonly RoleRepository: Repository<RoleEntity>
    ){}

    createRole(role: Role): Promise<Role> {
        return this.RoleRepository.save(role);
    }

    getRoleByName(name: string) : Promise<Role> {
        return this.RoleRepository.findOne({where: {name}});
    }
    

    getRole(id: number): Promise<Role> {
        return this.RoleRepository.findOneBy({id: id})
    }

    findAllRole(): Promise<Role[]> {
        return this.RoleRepository.find();
    }

    updateRole(id: number, role: Role): Promise<UpdateResult> {
        return this.RoleRepository.update(id, role);
    }

    deleteRole(id: number): Promise<DeleteResult> {
        return this.RoleRepository.delete(id);
    }
}
