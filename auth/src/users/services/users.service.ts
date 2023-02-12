import { Injectable } from '@nestjs/common';
import { UserEntity } from '../models/users.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from '../models/users.interface';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { RoleService } from 'src/roles/services/roles.service';
import { AuthService } from 'src/auth/services/auth.service';
import { Role } from 'src/roles/models/roles.interface';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
        private readonly rolesService: RoleService,
        private readonly authService: AuthService 
    ){}

    async createUser(user: User): Promise<User> {
        const currentUser: UserEntity   = new UserEntity();
        
        const userRole      : Role      = await this.rolesService.getRoleByName('USER');
        const passwordHash  : string    = await this.authService.hashPassword(user.password);
        
        currentUser.login       = user.login;
        currentUser.roles       = [userRole];
        currentUser.password    = passwordHash; 
        console.log(currentUser)
        const res = await this.usersRepository.save(currentUser)
        const {password, ...result} = res;
        return result;
    }

    getUser(id: number): Promise<User> {
        return this.usersRepository.findOneBy({id: id});
    }

    async findAllUsers(): Promise<User[]> {
        const res = await this.usersRepository.find({relations: {roles: true}});
        const result = res.map((user: User) => {
            const {password, ...other} = user;
            delete user.password;
            return other;
        })
        return result;
    }

    updateUser(id: number, user: User): Promise<UpdateResult> {
        return this.usersRepository.update(id, user);
    }

    deleteUser(id: number): Promise<DeleteResult> {
        return this.usersRepository.delete(id);
    }
}
