import { Injectable } from "@nestjs/common";
import { ISolutionRepository } from "src/domain/repositories/solution.repository";
import { BaseRepository } from "./base-repository";
import { Solution } from "../entities/solution.entity";
import { SolutionModel } from "src/domain/models/solution.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { Paginated } from "src/domain/interfaces/pagination.interface";
import { InvestmentBenefitProportionByCategory, InvestmentBenefitSummary, DepartmentTotalSolutions, GeneralStatusInsight } from "src/domain/interfaces/insights.interface";

@Injectable()
export class SolutionsRepository extends BaseRepository<Solution> implements ISolutionRepository {
    constructor(
        @InjectRepository(Solution)
        protected readonly repository: Repository<Solution>
    ) { super() }

    async findSummarized(name: string = "", page: number = 1, size: number = 10): 
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
                where: { name: Like(`%${name}%`) }
            });
            const count = await this.repository.count();

            return { 
                data, page, size, 
                totalPages: Math.ceil(count / size)
            };
    }

    async getInvestmentBenefitProportionByCategory(): Promise<InvestmentBenefitProportionByCategory[]> {
        return await this.repository
            .createQueryBuilder("s")
            .select("s.category", "category")
            .addSelect("AVG(s.benefit / s.investment)", "proportion")
            .groupBy("s.category")
            .getRawMany();
    }

    async getInvestmentBenefitSummary(): Promise<InvestmentBenefitSummary> {
        return await this.repository
            .createQueryBuilder("s")
            .select("SUM(s.investment)", "realInvestment")
            .addSelect("SUM(s.benefit)", "benefit")
            .getRawOne<InvestmentBenefitSummary>() 
                ?? { realInvestment: 0, benefit: 0 };
    }

    async getDepartmentTotalSolutions(): Promise<DepartmentTotalSolutions[]> {
        return await this.repository
            .createQueryBuilder("s")
            .select("s.clientDepartment", "department")
            .addSelect("COUNT(s.id)", "solutions")
            .groupBy("s.clientDepartment")
            .getRawMany();
    }

    async getGeneralStatusInsight(): Promise<GeneralStatusInsight> {
        const [completed, onGoing, awaiting, idea] = await Promise.all([
            this.repository.count({ where: { status: "Completed" } }),
            this.repository.count({ where: { status: "On Going" } }),
            this.repository.count({ where: { status: "Awaiting" } }),
            this.repository.count({ where: { status: "Idea" } })
        ]);
    
        return {completed, onGoing, awaiting, idea };
    }
}