import { InjectRepository } from "@nestjs/typeorm";
import { IUsersRepository } from "src/domain/repositories/user.repository";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./base-repository";
import { User } from "../entities/user.entity";

@Injectable()
export class UsersRepository extends BaseRepository<User> implements IUsersRepository {
    constructor(
        @InjectRepository(User)
        protected readonly repository: Repository<User>
    ) { super() }


    public async findOneByUsername(username: string): Promise<User | null> {
        return await this.repository.findOneBy({ username });
    }
}