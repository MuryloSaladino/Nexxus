import { IBaseRepository } from "src/domain/repositories/base.repository";
import { DeepPartial, FindOptionsWhere, Repository } from "typeorm";
import { BaseEntity } from "../entities/base.entity";
import { Paginated } from "src/domain/interfaces/pagination.interface";

export abstract class BaseRepository<TEntity extends BaseEntity> implements IBaseRepository<TEntity> {
    
    protected abstract repository: Repository<TEntity>


    public async create(entity: Partial<TEntity>): Promise<TEntity> {
        const entityCreation = this.repository.create(entity as DeepPartial<TEntity>);
        return await this.repository.save(entityCreation);
    }

    public async findById(id: string): Promise<TEntity | null> {
        return await this.repository.findOneBy({ id } as FindOptionsWhere<TEntity>);
    }

    public async findAll(page: number = 1, size: number = 10): Promise<Paginated<TEntity>> {
        const data = await this.repository.find({
            skip: (page - 1) * size,
            take: size,
        });
        const count = await this.repository.count();

        return { 
            data, page, size, 
            totalPages: Math.ceil(count / size)
        };
    }

    public async update(id: string, payload: Partial<TEntity>): Promise<TEntity | null> {
        const entity = await this.findById(id);
        if(!entity) return null;

        const updatedEntity = { ...entity, ...payload };
        return await this.repository.save(updatedEntity);
    }

    public async delete(id: string): Promise<void> {
        const entity = await this.findById(id);
        if(!entity) return;

        await this.repository.remove(entity);
    }
}