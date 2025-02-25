import { IBcryptService } from "src/domain/adapters/bcrypt.interface";
import { IUsersRepository } from "src/domain/repositories/user.repository";
import { ILogger } from "src/domain/services/logger.interface";
import { NotFoundError } from "src/infrastructure/errors/not-found.error";

export class UpdateUserUseCases {
    constructor(
        private readonly logger: ILogger,
        private readonly usersRepository: IUsersRepository,
        private readonly bcryptService: IBcryptService,
    ) {}

    async execute(
        id: string, 
        username?: string, 
        password?: string
    ) {
        const user = await this.usersRepository.findById(id);

        if(!user) {
            throw new NotFoundError("User not found");
        }

        if(password) {
            user.password = await this.bcryptService.hash(password);
        }
        if(username) {
            user.username = username;
        }

        this.logger.log(`User {${id}} was updated`, "UpdateUserUseCases");

        return (await this.usersRepository.update(id, user))!;
    }
}