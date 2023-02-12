import { RoleEntity } from "src/roles/models/roles.entity";
import { Role } from "src/roles/models/roles.interface";
import { UserEntity } from "src/users/models/users.entity";
import { User } from "src/users/models/users.interface";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity('users_roles')
export class UserToRole {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => UserEntity, (user) => user.userToRole)
    public user: User;

    @ManyToOne(() => RoleEntity, (role) => role.userToRole)
    public role: Role;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;
     
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;
}
