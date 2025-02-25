import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const dataSource = new DataSource({
    type: 'postgres',
    url: process.env.DB_URL,
    entities: [__dirname + './../../**/*.entity{.ts,.js}'],
    synchronize: false,
    migrationsRun: true,
    migrations: [__dirname + '/../../../../**/migrations/**/*{.ts,.js}'],
});

export default dataSource;