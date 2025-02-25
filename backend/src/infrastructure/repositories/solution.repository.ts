import { Injectable } from "@nestjs/common";
import { ISolutionRepository } from "src/domain/repositories/solution.repository";
import { BaseRepository } from "./base-repository";
import { Solution } from "../entities/solution.entity";
import { SolutionModel } from "src/domain/models/solution.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Paginated } from "src/domain/interfaces/pagination.interface";

@Injectable()
export class SolutionsRepository extends BaseRepository<Solution> implements ISolutionRepository {
    constructor(
        @InjectRepository(Solution)
        protected readonly repository: Repository<Solution>
    ) { super() }

    async findSummarized(page: number = 1, size: number = 10): 
        Promise<Paginated<Omit<SolutionModel, "description" | "justification" | "orchestration">>> {
            const data = await this.repository.find({
                select: {
                    id: true,
                    createdAt: true,
                    updatedAt: true,
                    deletedAt: true,
                    userInChargeId: true,
                    userInCharge: { username: true },
                    clientDepartment: true,
                    benefit: true,
                    investment: true,
                    status: true,
                    priority: true,
                },
                relations: { userInCharge: true },
                skip: (page - 1) * size,
                take: size,
            });

            const count = await this.repository.count();

            return { 
                data, page, size, 
                totalPages: Math.ceil(count / size)
            };
    }
}