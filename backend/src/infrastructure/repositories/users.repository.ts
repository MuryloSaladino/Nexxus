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


    public async findOneByEmail(email: string): Promise<User | null> {
        return await this.repository.findOne({
            where: { email }
        });
    }

    public async existsByEmail(email: string): Promise<boolean> {
        return await this.repository.existsBy({ email });
    }
}