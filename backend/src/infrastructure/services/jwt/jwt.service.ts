import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IJwtPayload, IJWTService } from "src/domain/adapters/jwt.interface";
import EnvironmentConfigService from "src/infrastructure/config/enviroment/enviroment-config.service";

@Injectable()
export class JWTService implements IJWTService {
    secretKey: string;
    expiresIn: string;
    
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: EnvironmentConfigService
    ) {
        this.secretKey = this.configService.getJwtSecret();
        this.expiresIn = this.configService.getJwtExpirationTime();
    }

    
    extractToken(token: string): Promise<IJwtPayload> {
        return this.jwtService.verifyAsync(token);
    }

    createToken(payload: string): string {
        return this.jwtService.sign(payload, {
            secret: this.secretKey
        });
    }
}
