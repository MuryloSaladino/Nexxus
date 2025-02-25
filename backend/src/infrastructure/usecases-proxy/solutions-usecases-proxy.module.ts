import { DynamicModule, Module } from "@nestjs/common";
import { RepositoriesModule } from "../repositories/repositories.module";
import { UsersRepository } from "../repositories/users.repository";
import { UseCaseProxy } from "./usecases-proxy";
import { SolutionsRepository } from "../repositories/solution.repository";
import { CreateSolutionUseCases } from "src/usecases/solutions/create-solution.usecases";
import { GetSolutionUseCases } from "src/usecases/solutions/get-solution.usecases";
import { GetAllSolutionsUseCases } from "src/usecases/solutions/get-all-solutions.usecases";
import { UpdateSolutionUseCases } from "src/usecases/solutions/update-solution.usecases";
import { DeleteSolutionUseCases } from "src/usecases/solutions/delete-solution.usecases";
import { SolutionInsightsUseCases } from "src/usecases/solutions/solution-insights.usecases";

@Module({
    imports: [
        RepositoriesModule,
    ]
})
export class SolutionsUseCasesProxyModule {

    static CREATE_SOLUTION_PROXY = "createSolutionProxy";
    static GET_SOLUTION_PROXY = "getSolutionProxy";
    static GET_ALL_SOLUTIONS_PROXY = "getAllSolutionsProxy";
    static UPDATE_SOLUTION_PROXY = "updateSolutionProxy";
    static DELETE_SOLUTION_PROXY = "deleteSolutionProxy";
    static SOLUTION_INSIGHTS_PROXY = "solutionInsightsProxy";
    

    static register(): DynamicModule {
        return {
            module: SolutionsUseCasesProxyModule,
            providers: [
                {
                    inject: [SolutionsRepository, UsersRepository],
                    provide: SolutionsUseCasesProxyModule.CREATE_SOLUTION_PROXY,
                    useFactory: (
                        solutionsRepository: SolutionsRepository,
                        usersRepository: UsersRepository,
                    ) => new UseCaseProxy(new CreateSolutionUseCases(solutionsRepository, usersRepository))
                },
                {
                    inject: [SolutionsRepository],
                    provide: SolutionsUseCasesProxyModule.GET_SOLUTION_PROXY,
                    useFactory: (
                        solutionsRepository: SolutionsRepository
                    ) => new UseCaseProxy(new GetSolutionUseCases(solutionsRepository))
                },
                {
                    inject: [SolutionsRepository],
                    provide: SolutionsUseCasesProxyModule.GET_ALL_SOLUTIONS_PROXY,
                    useFactory: (
                        solutionsRepository: SolutionsRepository,
                    ) => new UseCaseProxy(new GetAllSolutionsUseCases(solutionsRepository))
                },
                {
                    inject: [SolutionsRepository, UsersRepository],
                    provide: SolutionsUseCasesProxyModule.UPDATE_SOLUTION_PROXY,
                    useFactory: (
                        solutionsRepository: SolutionsRepository,
                        usersRepository: UsersRepository,
                    ) => new UseCaseProxy(new UpdateSolutionUseCases(solutionsRepository, usersRepository))
                },
                {
                    inject: [SolutionsRepository],
                    provide: SolutionsUseCasesProxyModule.DELETE_SOLUTION_PROXY,
                    useFactory: (
                        solutionsRepository: SolutionsRepository,
                    ) => new UseCaseProxy(new DeleteSolutionUseCases(solutionsRepository))
                },
                {
                    inject: [SolutionsRepository],
                    provide: SolutionsUseCasesProxyModule.SOLUTION_INSIGHTS_PROXY,
                    useFactory: (
                        solutionsRepository: SolutionsRepository,
                    ) => new UseCaseProxy(new SolutionInsightsUseCases(solutionsRepository))
                },
            ],
            exports: [
                SolutionsUseCasesProxyModule.CREATE_SOLUTION_PROXY,
                SolutionsUseCasesProxyModule.GET_SOLUTION_PROXY,
                SolutionsUseCasesProxyModule.GET_ALL_SOLUTIONS_PROXY,
                SolutionsUseCasesProxyModule.UPDATE_SOLUTION_PROXY,
                SolutionsUseCasesProxyModule.DELETE_SOLUTION_PROXY,
                SolutionsUseCasesProxyModule.SOLUTION_INSIGHTS_PROXY,
            ]
        }
    }
}
