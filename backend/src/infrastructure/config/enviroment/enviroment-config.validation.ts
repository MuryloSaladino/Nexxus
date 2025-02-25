import { plainToClass } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, IsString, validateSync } from 'class-validator';

enum Environment {
    DEV = 'dev',
    PROD = 'prod',
    LOCAL = 'local',
    TEST = 'test',
}

class EnvironmentVariables {
    @IsEnum(Environment)
    NODE_ENV: Environment;

    @IsString()
    JWT_SECRET: string;
    @IsString()
    JWT_EXPIRATION_TIME: string;

    @IsString()
    DB_URL: string;
    @IsBoolean()
    @IsOptional()
    DB_SYNC: boolean;
}

export function validate(config: Record<string, unknown>) {
    const validatedConfig = plainToClass(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });
    const errors = validateSync(validatedConfig, { skipMissingProperties: false });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
}
