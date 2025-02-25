import { Injectable } from "@nestjs/common";
import { ISolutionRepository } from "src/domain/repositories/solution.repository";
import { BaseRepository } from "./base-repository";
import { Solution } from "../entities/solution.entity";
import { SolutionModel } from "src/domain/models/solution.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class SolutionRepository extends BaseRepository<Solution> implements ISolutionRepository {
    constructor(
        @InjectRepository(Solution)
        protected readonly repository: Repository<Solution>
    ) { super() }

    async findSummarized(): Promise<Omit<SolutionModel, "description" | "justification" | "orchestration">[]> {
        return await this.repository.find({
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
            relations: { userInCharge: true }
        })
    }
}