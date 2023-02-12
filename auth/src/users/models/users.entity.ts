import { RoleEntity } from 'src/roles/models/roles.entity';
import { Role } from 'src/roles/models/roles.interface';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    login: string;

    @Column()
    password: string;
    
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;
     
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'}) 
    updatedAt: Date;

    @ManyToMany(() => RoleEntity, role => role.users)
    @JoinTable()
    public roles: Role[];

}