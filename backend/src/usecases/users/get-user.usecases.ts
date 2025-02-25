import { IUsersRepository } from "src/domain/repositories/user.repository";
import { ILogger } from "src/domain/services/logger.interface";
import { NotFoundError } from "src/infrastructure/errors/not-found.error";

export class GetUserUseCases {
    constructor(
        private readonly logger: ILogger,
        private readonly usersRepository: IUsersRepository,
    ) {}

    async execute(id: string) {
        const user = await this.usersRepository.findById(id);

        if(!user) {
            this.logger.warn("User not found", "GetUserUseCases");
            throw new NotFoundError("User was not found");
        }

        this.logger.log(`User retrieved from database { userId: ${user.id} }`, "GetUserUseCases");
        return user;
    }
}