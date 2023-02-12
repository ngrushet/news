import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { RoleService } from '../services/roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from '../models/roles.interface'

@Controller('roles')
export class RoleController {
    constructor(
        private readonly RoleService: RoleService
    ){}

    @Post()
    create(@Body() Role: CreateRoleDto): Promise<Role>  {
        return this.RoleService.createRole(Role);   
    }

    @Get('/:name')
    getByName(@Param('name') name: string) {
        return this.RoleService.getRoleByName(name)
    }

    @Get()
    findAll(): Promise<Role[]> {
        return this.RoleService.findAllRole();
    }

    @Get(':id')
    get(@Param('id') id: number): Promise<Role>{
        return this.RoleService.getRole(id);
    }

    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() Role: Role
    ): Promise<UpdateResult> {
        return this.RoleService.updateRole(id, Role)
    }

    @Delete(':id')
    delete(
        @Param('id') id: number,
    ): Promise<DeleteResult> {
        return this.RoleService.deleteRole(id);
    }
}
