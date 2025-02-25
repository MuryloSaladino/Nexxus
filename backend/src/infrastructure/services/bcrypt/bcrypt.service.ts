import * as bcrypt from 'bcryptjs';
import { Injectable } from "@nestjs/common";
import { IBcryptService } from "src/domain/adapters/bcrypt.interface";

@Injectable()
export class BCryptService implements IBcryptService {
    rounds: number = 10;

    public async hash(str: string): Promise<string> {
        return await bcrypt.hash(str, this.rounds);
    }

    public async compare(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }
}
