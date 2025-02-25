import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LoggerServiceModule } from './infrastructure/services/logger/logger.module';
import { UsersUseCasesProxyModule } from './infrastructure/usecases-proxy/users-usecases-proxy.module';
import { BCryptServiceModule } from './infrastructure/services/bcrypt/bcrypt.module';
import { JWTServiceModule } from './infrastructure/services/jwt/jwt.module';
import { EnvironmentConfigModule } from './infrastructure/config/enviroment/enviroment-config.module';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { SolutionsUseCasesProxyModule } from './infrastructure/usecases-proxy/solutions-usecases-proxy.module';
import { AuthUseCasesProxyModule } from './infrastructure/usecases-proxy/auth-usecases-proxy.module';

@Module({
    imports: [
        UsersUseCasesProxyModule.register(),
        SolutionsUseCasesProxyModule.register(),
        AuthUseCasesProxyModule.register(),
        
        ControllersModule,
        
        LoggerServiceModule,
        BCryptServiceModule,
        
        JwtModule.register({ secret: process.env.JWT_SECRET }),
        JWTServiceModule,
        
        EnvironmentConfigModule,
    ],
})
export class AppModule { }
