import { Body, Controller, Inject, Post } from "@nestjs/common";
import { AuthUseCasesProxyModule } from "src/infrastructure/usecases-proxy/auth-usecases-proxy.module";
import { UseCaseProxy } from "src/infrastructure/usecases-proxy/usecases-proxy";
import { LoginUseCases } from "src/usecases/auth/login.usecases";
import { LoginDTO } from "./users.dto";

@Controller("/auth")
export class AuthController {
    constructor(
        @Inject(AuthUseCasesProxyModule.LOGIN_PROXY)
        private readonly loginUseCaseProxy: UseCaseProxy<LoginUseCases> 
    ) {}

    @Post("/login")
    async login(@Body() { username, password }: LoginDTO) {
        return await this.loginUseCaseProxy
            .getInstance().login(username, password);
    }
}