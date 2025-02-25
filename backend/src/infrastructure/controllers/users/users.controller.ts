import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiResponseType } from "src/infrastructure/common/swagger/response.decorator";
import { CreateUserDTO, UpdateUserDTO } from "./users.dto";

@Controller("/users")
export class UsersController {
    constructor(
        // @Inject(UseCasesProxyModule.CREATE_USER_PROXY)
        // private readonly createUserUseCaseProxy: UseCaseProxy<CreateUserUseCases>,
        // @Inject(UseCasesProxyModule.GET_USER_PROXY)
        // private readonly getUserUseCaseProxy: UseCaseProxy<GetUserUseCases>,
        // @Inject(UseCasesProxyModule.GET_ALL_USERS_PROXY)
        // private readonly getAllUsersUseCaseProxy: UseCaseProxy<GetAllUsersUseCases>,
        // @Inject(UseCasesProxyModule.UPDATE_USER_PROXY)
        // private readonly updateUserUseCaseProxy: UseCaseProxy<UpdateUserUseCases>,
        // @Inject(UseCasesProxyModule.DELETE_USER_PROXY)
        // private readonly deleteUserUseCaseProxy: UseCaseProxy<DeleteUserUseCases>,
    ) {}


    // @Post()
    // @ApiResponseType(UserPresenter)
    // async createUser(@Body() payload: CreateUserDTO) {
    //     const { email, password, username } = payload;
    //     const user = await this.createUserUseCaseProxy
    //         .getInstance().execute(username, email, password);
    //     return new UserPresenter(user);
    // }

    // @Get("/:id")
    // @ApiResponseType(UserPresenter)
    // async getUser(@Param("id") id: string) {
    //     const user = await this.getUserUseCaseProxy
    //         .getInstance().execute(id);
    //     return new UserPresenter(user);
    // }

    // @Get()
    // @ApiResponseType(UserPresenter, true)
    // async getAllUsers(
    //     @Query("page") page: number,
    //     @Query("size") size: number
    // ) {
    //     const users = await this.getAllUsersUseCaseProxy
    //         .getInstance().execute(page, size)
    //     return {
    //         ...users,
    //         data: users.data.map(x => new UserPresenter(x))
    //     }
    // }

    // @Patch("/:id")
    // @ApiResponseType(UserPresenter)
    // async updateUser(
    //     @Param("id") id: string, 
    //     @Body() { email, password, username }: UpdateUserDTO
    // ) {
    //     const updatedUser = await this.updateUserUseCaseProxy
    //         .getInstance().execute(id, username, email, password);
    //     return new UserPresenter(updatedUser);
    // }

    // @Delete("/:id")
    // async deleteUser(@Param("id") id: string) {
    //     await this.deleteUserUseCaseProxy
    //         .getInstance().execute(id);
    // }
}
