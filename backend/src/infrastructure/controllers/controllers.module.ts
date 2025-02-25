import { Module } from "@nestjs/common";
import { UsersUseCasesProxyModule } from "../usecases-proxy/users-usecases-proxy.module";
import { UsersController } from "./users/users.controller";
import { SolutionsUseCasesProxyModule } from "../usecases-proxy/solutions-usecases-proxy.module";
import { SolutionsController } from "./solutions/solutions.controller";
import { AuthUseCasesProxyModule } from "../usecases-proxy/auth-usecases-proxy.module";
import { AuthController } from "./auth/auth.controller";
import { JWTServiceModule } from "../services/jwt/jwt.module";
import { InsightsController } from "./insights/insights.controller";

@Module({
    imports: [
        UsersUseCasesProxyModule.register(),
        SolutionsUseCasesProxyModule.register(),
        AuthUseCasesProxyModule.register(),
        
        JWTServiceModule,
    ],
    controllers: [
        UsersController,
        SolutionsController,
        AuthController,
        InsightsController,
    ],
})
export class ControllersModule {}
