import { IUsersRepository } from "src/domain/repositories/user.repository";
import { ILogger } from "src/domain/services/logger.interface";

export class DeleteUserUseCases {
    constructor(
        private readonly logger: ILogger,
        private readonly usersRepository: IUsersRepository,
    ) {}

    async execute(id: string) {
        await this.usersRepository.delete(id);

        this.logger.log(`User {${id}} has been deleted`, "DeleteUserUseCases")
    }
}
