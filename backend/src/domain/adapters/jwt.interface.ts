export interface IJwtPayload {
    username: string;
    userId: string;
}

export interface IJWTService {
    secretKey: string;
    expiresIn: string;
    extractToken(token: string): Promise<IJwtPayload>;
    createToken(payload: string): string;
}
