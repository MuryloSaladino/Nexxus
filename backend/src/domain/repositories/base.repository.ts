import { Paginated } from "../interfaces/pagination.interface";
import { BaseModel } from "../models/base.model";

export interface IBaseRepository<T extends BaseModel> {
    create(entity: Partial<T>): Promise<T>;
    findById(id: string): Promise<T | null>;
    findAll(page?: number, size?: number): Promise<Paginated<T>>;
    update(id: string, payload: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<void>;
}