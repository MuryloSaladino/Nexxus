import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DatabaseConfig } from "src/domain/config/database.interface";
import { JWTConfig } from "src/domain/config/jwt.interface";

@Injectable()
export default class EnvironmentConfigService implements DatabaseConfig, JWTConfig {
    constructor(
        private readonly configService: ConfigService
    ) {}

    public getJwtSecret(): string {
        return this.configService.get<string>("JWT_SECRET") || "";
    }

    public getJwtExpirationTime(): string {
        return this.configService.get<string>("JWT_EXPIRATION_TIME") || "";
    }
    
    public getDatabaseURL(): string {
        return this.configService.get<string>("DB_URL") || "";
    }

    public getDatabaseSync(): boolean {
        return this.configService.get<boolean>("DB_SYNC") || false;
    }
}
