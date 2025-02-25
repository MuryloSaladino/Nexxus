import { UserModel } from "../models/user.model";
import { IBaseRepository } from "./base.repository";

export interface IUsersRepository extends IBaseRepository<UserModel> {
    findOneByUsername(username: string): Promise<UserModel | null>;
}
