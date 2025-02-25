import { DynamicModule, Module } from "@nestjs/common";
import { LoggerServiceModule } from "../services/logger/logger.module";
import { BCryptServiceModule } from "../services/bcrypt/bcrypt.module";
import { RepositoriesModule } from "../repositories/repositories.module";

@Module({
    imports: [
        LoggerServiceModule,
        RepositoriesModule,
        BCryptServiceModule,
    ]
})
export class UseCasesProxyModule {
    
    static register(): DynamicModule {
        return {
            module: UseCasesProxyModule,
            providers: [
                
            ],
            exports: [

            ]
        }
    }
}
