import { IsEmail, IsNotEmpty,} from "class-validator";

export class UpdateUserDto {
    @IsNotEmpty()
    readonly name: string;
}