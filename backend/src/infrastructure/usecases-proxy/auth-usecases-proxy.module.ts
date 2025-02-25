import { DynamicModule, Module } from "@nestjs/common";
import { BCryptServiceModule } from "../services/bcrypt/bcrypt.module";
import { RepositoriesModule } from "../repositories/repositories.module";
import { UsersRepository } from "../repositories/users.repository";
import { BCryptService } from "../services/bcrypt/bcrypt.service";
import { UseCaseProxy } from "./usecases-proxy";
import { JWTServiceModule } from "../services/jwt/jwt.module";
import { LoginUseCases } from "src/usecases/auth/login.usecases";
import { JWTService } from "../services/jwt/jwt.service";

@Module({
    imports: [
        RepositoriesModule,
        BCryptServiceModule,
        JWTServiceModule,
    ]
})
export class AuthUseCasesProxyModule {

    static LOGIN_PROXY = "loginProxy";

    static register(): DynamicModule {
        return {
            module: AuthUseCasesProxyModule,
            providers: [
                {
                    inject: [JWTService, BCryptService, UsersRepository],
                    provide: AuthUseCasesProxyModule.LOGIN_PROXY,
                    useFactory: (
                        jwtService: JWTService,
                        bcryptService: BCryptService,
                        usersRepository: UsersRepository
                    ) => new UseCaseProxy(new LoginUseCases(jwtService, bcryptService, usersRepository))
                },
            ],
            exports: [
                AuthUseCasesProxyModule.LOGIN_PROXY,
            ]
        }
    }
}
