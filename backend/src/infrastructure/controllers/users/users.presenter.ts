import { ApiProperty } from "@nestjs/swagger";
import { UserModel } from "src/domain/models/user.model";

export class UserPresenter {
    @ApiProperty()
    readonly id: string;
    @ApiProperty()
    readonly createdAt: Date;
    @ApiProperty()
    readonly updatedAt: Date;
    @ApiProperty()
    readonly deletedAt: Date | null;
    @ApiProperty()
    readonly username: string;

    constructor(user: UserModel) {
        this.id = user.id;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
        this.deletedAt = user.deletedAt;
        this.username = user.username;
    }
}
