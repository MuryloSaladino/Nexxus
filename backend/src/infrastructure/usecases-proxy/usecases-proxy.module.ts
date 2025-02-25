import { DynamicModule, Module } from "@nestjs/common";
import { LoggerServiceModule } from "../services/logger/logger.module";
import { BCryptServiceModule } from "../services/bcrypt/bcrypt.module";
import { RepositoriesModule } from "../repositories/repositories.module";
import { LoggerService } from "../services/logger/logger.service";
import { UsersRepository } from "../repositories/users.repository";
import { BCryptService } from "../services/bcrypt/bcrypt.service";
import { UseCaseProxy } from "./usecases-proxy";
import { CreateUserUseCases } from "src/usecases/users/create-user.usecases";
import { GetUserUseCases } from "src/usecases/users/get-user.usecases";
import { GetAllUsersUseCases } from "src/usecases/users/get-all-users.usecases";
import { UpdateUserUseCases } from "src/usecases/users/update-user.usecases";
import { DeleteUserUseCases } from "src/usecases/users/delete-user.usecases";

@Module({
    imports: [
        LoggerServiceModule,
        RepositoriesModule,
        BCryptServiceModule,
    ]
})
export class UseCasesProxyModule {

    // Users
    static CREATE_USER_PROXY = "createUserProxy";
    static GET_USER_PROXY = "getUserProxy";
    static GET_ALL_USERS_PROXY = "getAllUsersProxy";
    static UPDATE_USER_PROXY = "updateUserProxy";
    static DELETE_USER_PROXY = "deleteUserProxy";
    
    static register(): DynamicModule {
        return {
            module: UseCasesProxyModule,
            providers: [
                {
                    inject: [LoggerService, UsersRepository, BCryptService],
                    provide: UseCasesProxyModule.CREATE_USER_PROXY,
                    useFactory: (
                        logger: LoggerService,
                        usersRepository: UsersRepository,
                        bcryptService: BCryptService
                    ) => new UseCaseProxy(new CreateUserUseCases(logger, usersRepository, bcryptService))
                },
                {
                    inject: [LoggerService, UsersRepository],
                    provide: UseCasesProxyModule.GET_USER_PROXY,
                    useFactory: (
                        logger: LoggerService,
                        usersRepository: UsersRepository
                    ) => new UseCaseProxy(new GetUserUseCases(logger, usersRepository))
                },
                {
                    inject: [LoggerService, UsersRepository],
                    provide: UseCasesProxyModule.GET_ALL_USERS_PROXY,
                    useFactory: (
                        logger: LoggerService,
                        usersRepository: UsersRepository,
                    ) => new UseCaseProxy(new GetAllUsersUseCases(logger, usersRepository))
                },
                {
                    inject: [LoggerService, UsersRepository, BCryptService],
                    provide: UseCasesProxyModule.UPDATE_USER_PROXY,
                    useFactory: (
                        logger: LoggerService,
                        usersRepository: UsersRepository,
                        bcryptService: BCryptService
                    ) => new UseCaseProxy(new UpdateUserUseCases(logger, usersRepository, bcryptService))
                },
                {
                    inject: [LoggerService, UsersRepository],
                    provide: UseCasesProxyModule.DELETE_USER_PROXY,
                    useFactory: (
                        logger: LoggerService,
                        usersRepository: UsersRepository,
                    ) => new UseCaseProxy(new DeleteUserUseCases(logger, usersRepository))
                },
            ],
            exports: [
                // Users
                UseCasesProxyModule.CREATE_USER_PROXY,
                UseCasesProxyModule.GET_USER_PROXY,
                UseCasesProxyModule.GET_ALL_USERS_PROXY,
                UseCasesProxyModule.UPDATE_USER_PROXY,
                UseCasesProxyModule.DELETE_USER_PROXY,
            ]
        }
    }
}
