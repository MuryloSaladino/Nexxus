import { Module } from "@nestjs/common";
import { BCryptService } from "./bcrypt.service";

@Module({
    providers: [BCryptService],
    exports: [BCryptService],
})
export class BCryptServiceModule {}
