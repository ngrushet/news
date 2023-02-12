import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { User } from '../models/users.interface';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService
    ){}

    @Post()
    create(@Body() User: CreateUserDto): Promise<User>  {
        return this.userService.createUser(User);   
    }

    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAllUsers();
    }

    @Get(':id')
    get(@Param('id') id: number): Promise<User>{
        return this.userService.getUser(id);
    }

    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() User: User
    ): Promise<UpdateResult> {
        return this.userService.updateUser(id, User)
    }

    @Delete(':id')
    delete(
        @Param('id') id: number,
    ): Promise<DeleteResult> {
        return this.userService.deleteUser(id);
    }
}
