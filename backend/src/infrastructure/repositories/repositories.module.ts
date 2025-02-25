import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { User } from '../entities/user.entity';
import { Solution } from '../entities/solution.entity';
import { SolutionsRepository } from './solution.repository';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';

@Module({
    imports: [
        TypeOrmConfigModule, 
        TypeOrmModule.forFeature([User, Solution])
    ],
    providers: [UsersRepository, SolutionsRepository],
    exports: [UsersRepository, SolutionsRepository]
})
export class RepositoriesModule {}
