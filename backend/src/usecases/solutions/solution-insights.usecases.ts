import { DepartmentTotalSolutions, GeneralStatusInsight, InvestmentBenefitProportionByCategory, InvestmentBenefitSummary } from "src/domain/interfaces/insights.interface";
import { ISolutionRepository } from "src/domain/repositories/solution.repository";

export class SolutionInsightsUseCases {
    constructor(
        private readonly solutionsRepository: ISolutionRepository,
    ) { }

    async getInvestmentBenefitProportionByCategory(): Promise<InvestmentBenefitProportionByCategory[]> {
        return await this.solutionsRepository.getInvestmentBenefitProportionByCategory()
    }

    async getInvestmentBenefitSummary(): Promise<InvestmentBenefitSummary> {
        return await this.solutionsRepository.getInvestmentBenefitSummary()
    }

    async getDepartmentTotalSolutions(): Promise<DepartmentTotalSolutions[]> {
        return await this.solutionsRepository.getDepartmentTotalSolutions()
    }

    async getGeneralStatusInsight(): Promise<GeneralStatusInsight> {
        return await this.solutionsRepository.getGeneralStatusInsight()
    }
}