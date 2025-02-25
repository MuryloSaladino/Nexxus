import { Module } from '@nestjs/common';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm-config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { User } from '../entities/user.entity';

@Module({
    imports: [
        TypeOrmConfigModule, 
        TypeOrmModule.forFeature([ User, ])
    ],
    providers: [UsersRepository],
    exports: [UsersRepository]
})
export class RepositoriesModule {}
