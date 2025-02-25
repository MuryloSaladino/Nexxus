import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LoggerServiceModule } from './infrastructure/services/logger/logger.module';
import { UseCasesProxyModule } from './infrastructure/usecases-proxy/usecases-proxy.module';
import { BCryptServiceModule } from './infrastructure/services/bcrypt/bcrypt.module';
import { JWTServiceModule } from './infrastructure/services/jwt/jwt.module';
import { EnvironmentConfigModule } from './infrastructure/config/enviroment/enviroment-config.module';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeormConfig from './infrastructure/config/typeorm/typeorm.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [typeormConfig]
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => (configService.get('typeorm')!)
        }),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
        }),
        LoggerServiceModule,
        UseCasesProxyModule.register(),
        ControllersModule,
        BCryptServiceModule,
        JWTServiceModule,
        EnvironmentConfigModule,
    ],
})
export class AppModule { }
