import { Controller, Get, Inject, UseGuards } from "@nestjs/common";
import { SolutionsUseCasesProxyModule } from "src/infrastructure/usecases-proxy/solutions-usecases-proxy.module";
import { UseCaseProxy } from "src/infrastructure/usecases-proxy/usecases-proxy";
import { AuthGuard } from "src/infrastructure/common/guards/auth.guard";
import { SolutionInsightsUseCases } from "src/usecases/solutions/solution-insights.usecases";

@UseGuards(AuthGuard)
@Controller("/insights")
export class InsightsController {
    constructor(
        @Inject(SolutionsUseCasesProxyModule.SOLUTION_INSIGHTS_PROXY)
        private readonly solutionInsightsUseCaseProxy: UseCaseProxy<SolutionInsightsUseCases>,
    ) {}

    @Get("/investment-benefit-proportion")
    async getInvestmentBenefitProportion() {
        return await this.solutionInsightsUseCaseProxy
            .getInstance().getInvestmentBenefitProportion()
    }

    @Get("/investment-benefit-summary")
    async getInvestmentBenefitSummary() {
        return await this.solutionInsightsUseCaseProxy
            .getInstance().getInvestmentBenefitSummary()
    }

    @Get("/department-total-solutions")
    async getDepartmentTotalSolutions() {
        return await this.solutionInsightsUseCaseProxy
            .getInstance().getDepartmentTotalSolutions()
    }

    @Get("/general-status")
    async getGeneralStatusInsight() {
        return await this.solutionInsightsUseCaseProxy
            .getInstance().getGeneralStatusInsight()
    }
}
