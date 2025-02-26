import { IBcryptService } from "src/domain/adapters/bcrypt.interface";
import { IJWTService } from "src/domain/adapters/jwt.interface";
import { IUsersRepository } from "src/domain/repositories/user.repository";
import { NotFoundError } from "src/infrastructure/errors/not-found.error";
import { UnauthorizedError } from "src/infrastructure/errors/unauthrized.error";

export class LoginUseCases {
    constructor(
        private readonly jwtService: IJWTService,
        private readonly bcryptService: IBcryptService,
        private readonly usersRepository: IUsersRepository,
    ) {}

    async login(username: string, password: string) {
        const user = await this.usersRepository.findOneByUsername(username);
        if(!user) throw new NotFoundError("Username not found");

        const match = await this.bcryptService.compare(password, user.password);
        if(!match) throw new UnauthorizedError("Invalid credentials");

        const token = this.jwtService.createToken({
            userId: user.id,
            username: user.username,
        });

        return { token, username }
    }
}