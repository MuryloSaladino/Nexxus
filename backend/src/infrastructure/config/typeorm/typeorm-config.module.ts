import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import EnvironmentConfigService from "../enviroment/enviroment-config.service";
import { Module } from "@nestjs/common";
import { EnvironmentConfigModule } from "../enviroment/enviroment-config.module";

export const getTypeOrmModuleOptions = (config: EnvironmentConfigService): TypeOrmModuleOptions =>
(
    {
        type: 'postgres',
        url: config.getDatabaseURL(),
        entities: [__dirname + './../../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        migrationsRun: !config.getDatabaseSync(),
        synchronize: config.getDatabaseSync(),
        cli: {
            migrationsDir: 'src/migrations',
        },
    } as TypeOrmModuleOptions
);


@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [EnvironmentConfigModule],
            inject: [EnvironmentConfigService],
            useFactory: getTypeOrmModuleOptions,
        }),
    ],
})
export class TypeOrmConfigModule {}