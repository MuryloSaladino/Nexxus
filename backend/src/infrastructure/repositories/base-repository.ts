import { IBaseRepository } from "src/domain/repositories/base.repository";
import { DeepPartial, FindOptionsWhere, Repository } from "typeorm";
import { BaseEntity } from "../entities/base.entity";

export abstract class BaseRepository<TEntity extends BaseEntity> implements IBaseRepository<TEntity> {
    
    protected abstract repository: Repository<TEntity>


    public async create(entity: Partial<TEntity>): Promise<TEntity> {
        const entityCreation = this.repository.create(entity as DeepPartial<TEntity>);
        return await this.repository.save(entityCreation);
    }

    public async findById(id: string): Promise<TEntity | null> {
        return await this.repository.findOneBy({ id } as FindOptionsWhere<TEntity>);
    }

    public async findAll(): Promise<TEntity[]> {
        return await this.repository.find();
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