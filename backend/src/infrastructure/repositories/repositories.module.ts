import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { User } from '../entities/user.entity';
import { Solution } from '../entities/solution.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ User, Solution ])
    ],
    providers: [UsersRepository],
    exports: [UsersRepository]
})
export class RepositoriesModule {}
