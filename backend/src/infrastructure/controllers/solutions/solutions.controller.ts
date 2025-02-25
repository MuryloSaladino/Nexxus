import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiResponseType } from "src/infrastructure/common/swagger/response.decorator";
import { SolutionsUseCasesProxyModule } from "src/infrastructure/usecases-proxy/solutions-usecases-proxy.module";
import { UseCaseProxy } from "src/infrastructure/usecases-proxy/usecases-proxy";
import { CreateSolutionUseCases } from "src/usecases/solutions/create-solution.usecases";
import { DeleteSolutionUseCases } from "src/usecases/solutions/delete-solution.usecases";
import { GetAllSolutionsUseCases } from "src/usecases/solutions/get-all-solutions.usecases";
import { GetSolutionUseCases } from "src/usecases/solutions/get-solution.usecases";
import { UpdateSolutionUseCases } from "src/usecases/solutions/update-solution.usecases";
import { SolutionPresenter, SummarizedSolutionPresenter } from "./solutions.presenter";
import { CreateSolutionDTO, UpdateSolutionDTO } from "./solutions.dto";
import { AuthGuard } from "src/infrastructure/common/guards/auth.guard";

@UseGuards(AuthGuard)
@Controller("/solutions")
export class SolutionsController {
    constructor(
        @Inject(SolutionsUseCasesProxyModule.CREATE_SOLUTION_PROXY)
        private readonly createSolutionUseCaseProxy: UseCaseProxy<CreateSolutionUseCases>,
        @Inject(SolutionsUseCasesProxyModule.GET_SOLUTION_PROXY)
        private readonly getSolutionUseCaseProxy: UseCaseProxy<GetSolutionUseCases>,
        @Inject(SolutionsUseCasesProxyModule.GET_ALL_SOLUTIONS_PROXY)
        private readonly getAllSolutionsUseCaseProxy: UseCaseProxy<GetAllSolutionsUseCases>,
        @Inject(SolutionsUseCasesProxyModule.UPDATE_SOLUTION_PROXY)
        private readonly updateSolutionUseCaseProxy: UseCaseProxy<UpdateSolutionUseCases>,
        @Inject(SolutionsUseCasesProxyModule.DELETE_SOLUTION_PROXY)
        private readonly deleteSolutionUseCaseProxy: UseCaseProxy<DeleteSolutionUseCases>,
    ) {}


    @Post()
    @ApiResponseType(SolutionPresenter)
    async createSolution(@Body() payload: CreateSolutionDTO) {
        const solution = await this.createSolutionUseCaseProxy
            .getInstance().execute(payload);
        return new SolutionPresenter(solution);
    }

    @Get("/:id")
    @ApiResponseType(SolutionPresenter)
    async getSolution(@Param("id") id: string) {
        const user = await this.getSolutionUseCaseProxy
            .getInstance().execute(id);
        return new SolutionPresenter(user);
    }

    @Get()
    @ApiResponseType(SolutionPresenter, true)
    async getAllSolutions(
        @Query("page") page: number,
        @Query("size") size: number
    ) {
        const users = await this.getAllSolutionsUseCaseProxy
            .getInstance().execute(page, size)
        return {
            ...users,
            data: users.data.map(x => new SummarizedSolutionPresenter(x))
        }
    }

    @Patch("/:id")
    @ApiResponseType(SolutionPresenter)
    async updateSolution(
        @Param("id") id: string, 
        @Body() payload: UpdateSolutionDTO
    ) {
        const updatedSolution = await this.updateSolutionUseCaseProxy
            .getInstance().execute(id, payload);
        return new SolutionPresenter(updatedSolution);
    }

    @Delete("/:id")
    async deleteSolution(@Param("id") id: string) {
        await this.deleteSolutionUseCaseProxy.getInstance().execute(id);
    }
}
