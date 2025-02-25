import { Module } from "@nestjs/common";
import { UsersUseCasesProxyModule } from "../usecases-proxy/users-usecases-proxy.module";
import { UsersController } from "./users/users.controller";
import { SolutionsUseCasesProxyModule } from "../usecases-proxy/solutions-usecases-proxy.module";
import { SolutionsController } from "./solutions/solutions.controller";

@Module({
    imports: [
        UsersUseCasesProxyModule.register(),
        SolutionsUseCasesProxyModule.register(),
    ],
    controllers: [
        UsersController,
        SolutionsController,
    ],
})
export class ControllersModule {}
