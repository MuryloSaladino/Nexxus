import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig({ path: '.env' });

const config = {
    type: 'postgres',
    url: `${process.env.DB_URL}`,
    entities: [__dirname + './../../**/*.entity{.ts,.js}'],
    migrations: ['./src/infrastructure/migrations/**/*{.ts,.js}'],
    autoLoadEntities: true,
    migrationsRun: true,
    synchronize: false,
}

export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);