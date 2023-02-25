import { IsNumber, IsString } from "class-validator";



export class AddRoleDto {
  @IsString({message: 'Has to be a string'})
  readonly value: string;
  @IsNumber({}, {message: 'Hes to be a number'})
  readonly userId: number;
}