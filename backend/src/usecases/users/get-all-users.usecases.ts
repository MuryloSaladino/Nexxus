import { IUsersRepository } from "src/domain/repositories/user.repository";
import { ILogger } from "src/domain/services/logger.interface";

export class GetAllUsersUseCases {
    constructor(
        private readonly logger: ILogger,
        private readonly usersRepository: IUsersRepository,
    ) {}

    async execute(page: number = 1, size: number = 10) {
        const users = await this.usersRepository.findAll(page, size);

        this.logger.log(`Returning all users in page [${page}], size [${size}]`, "GetAllUsersUseCases");

        return users;
    }
}