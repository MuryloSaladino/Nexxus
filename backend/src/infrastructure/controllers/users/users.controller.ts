import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiResponseType } from "src/infrastructure/common/swagger/response.decorator";
import { CreateUserDTO, UpdateUserDTO } from "./users.dto";
import { UsersUseCasesProxyModule } from "src/infrastructure/usecases-proxy/users-usecases-proxy.module";
import { UseCaseProxy } from "src/infrastructure/usecases-proxy/usecases-proxy";
import { CreateUserUseCases } from "src/usecases/users/create-user.usecases";
import { GetUserUseCases } from "src/usecases/users/get-user.usecases";
import { GetAllUsersUseCases } from "src/usecases/users/get-all-users.usecases";
import { UpdateUserUseCases } from "src/usecases/users/update-user.usecases";
import { DeleteUserUseCases } from "src/usecases/users/delete-user.usecases";
import { UserPresenter } from "./users.presenter";

@Controller("/users")
export class UsersController {
    constructor(
        @Inject(UsersUseCasesProxyModule.CREATE_USER_PROXY)
        private readonly createUserUseCaseProxy: UseCaseProxy<CreateUserUseCases>,
        @Inject(UsersUseCasesProxyModule.GET_USER_PROXY)
        private readonly getUserUseCaseProxy: UseCaseProxy<GetUserUseCases>,
        @Inject(UsersUseCasesProxyModule.GET_ALL_USERS_PROXY)
        private readonly getAllUsersUseCaseProxy: UseCaseProxy<GetAllUsersUseCases>,
        @Inject(UsersUseCasesProxyModule.UPDATE_USER_PROXY)
        private readonly updateUserUseCaseProxy: UseCaseProxy<UpdateUserUseCases>,
        @Inject(UsersUseCasesProxyModule.DELETE_USER_PROXY)
        private readonly deleteUserUseCaseProxy: UseCaseProxy<DeleteUserUseCases>,
    ) {}


    @Post()
    @ApiResponseType(UserPresenter)
    async createUser(@Body() payload: CreateUserDTO) {
        const { password, username } = payload;
        const user = await this.createUserUseCaseProxy
            .getInstance().execute(username, password);
        return new UserPresenter(user);
    }

    @Get("/:id")
    @ApiResponseType(UserPresenter)
    async getUser(@Param("id") id: string) {
        const user = await this.getUserUseCaseProxy
            .getInstance().execute(id);
        return new UserPresenter(user);
    }

    @Get()
    @ApiResponseType(UserPresenter, true)
    async getAllUsers(
        @Query("page") page: number,
        @Query("size") size: number
    ) {
        const users = await this.getAllUsersUseCaseProxy
            .getInstance().execute(page, size)
        return {
            ...users,
            data: users.data.map(x => new UserPresenter(x))
        }
    }

    @Patch("/:id")
    @ApiResponseType(UserPresenter)
    async updateUser(
        @Param("id") id: string, 
        @Body() { password, username }: UpdateUserDTO
    ) {
        const updatedUser = await this.updateUserUseCaseProxy
            .getInstance().execute(id, username, password);
        return new UserPresenter(updatedUser);
    }

    @Delete("/:id")
    async deleteUser(@Param("id") id: string) {
        await this.deleteUserUseCaseProxy.getInstance().execute(id);
    }
}
