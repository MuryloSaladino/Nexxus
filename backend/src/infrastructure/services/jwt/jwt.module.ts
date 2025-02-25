import { Module } from "@nestjs/common";
import { EnvironmentConfigModule } from "src/infrastructure/config/enviroment/enviroment-config.module";
import { JwtModule } from "@nestjs/jwt";
import { JWTService } from "./jwt.service";

@Module({
    imports: [EnvironmentConfigModule, JwtModule],
    providers: [JWTService],
    exports: [JWTService],
})
export class JWTServiceModule {}
