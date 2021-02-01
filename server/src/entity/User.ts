import { Field, ObjectType } from 'type-graphql';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    VersionColumn,
} from 'typeorm';

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column('text')
    firstName: string;

    @Field()
    @Column('text')
    lastName: string;

    @Field()
    @Column('text')
    email: string;

    @Field()
    @Column('text')
    password: string;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;

    @Field()
    @DeleteDateColumn()
    deletedAt: Date;

    @Field()
    @VersionColumn()
    version: number;
}
