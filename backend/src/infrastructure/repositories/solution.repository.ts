import { Injectable } from "@nestjs/common";
import { ISolutionRepository } from "src/domain/repositories/solution.repository";
import { BaseRepository } from "./base-repository";
import { Solution } from "../entities/solution.entity";
import { SolutionModel } from "src/domain/models/solution.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Paginated } from "src/domain/interfaces/pagination.interface";
import { InvestmentBenefitProportion, InvestmentBenefitSummary, DepartmentTotalSolutions, GeneralStatusInsight } from "src/domain/interfaces/insights.interface";

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
                    userInCharge: { username: true },
                    description: false,
                    justification: false,
                    orchestration: false,
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

    async getInvestmentBenefitProportion(): Promise<InvestmentBenefitProportion[]> {
        return await this.repository
            .createQueryBuilder("s")
            .select("s.name", "projectName")
            .addSelect("s.benefit / s.investment", "proportion")
            .getRawMany();
    }

    async getInvestmentBenefitSummary(): Promise<InvestmentBenefitSummary> {
        throw new Error("Method not implemented.");
    }

    async getDepartmentTotalSolutions(): Promise<DepartmentTotalSolutions> {
        throw new Error("Method not implemented.");
    }

    async getGeneralStatusInsight(): Promise<GeneralStatusInsight> {
        throw new Error("Method not implemented.");
    }
}