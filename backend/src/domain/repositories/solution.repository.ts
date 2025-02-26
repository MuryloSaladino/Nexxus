import { DepartmentTotalSolutions, GeneralStatusInsight, InvestmentBenefitProportionByCategory, InvestmentBenefitSummary } from "../interfaces/insights.interface";
import { Paginated } from "../interfaces/pagination.interface";
import { SolutionModel } from "../models/solution.model";
import { IBaseRepository } from "./base.repository";

export interface ISolutionRepository extends IBaseRepository<SolutionModel> {
    findSummarized(name: string, page?: number, size?: number): 
        Promise<Paginated<Omit<SolutionModel, "description" | "justification" | "orchestration">>>;
    getInvestmentBenefitProportionByCategory(): Promise<InvestmentBenefitProportionByCategory[]>;
    getInvestmentBenefitSummary(): Promise<InvestmentBenefitSummary>;
    getDepartmentTotalSolutions(): Promise<DepartmentTotalSolutions[]>;
    getGeneralStatusInsight(): Promise<GeneralStatusInsight>;
}
