export interface IBcryptService {
    hash(str: string): Promise<string>;
    compare(password: string, hashedPassword: string): Promise<boolean>;
}
