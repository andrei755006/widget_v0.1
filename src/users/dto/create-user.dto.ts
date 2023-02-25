import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";
export class CreateUserDto {

  @ApiProperty({example: '1111@gmail.com', description: 'email'})
  @IsString({message: 'Has to be a string'})
  @IsEmail({}, {message: 'Incorrect email'})
  readonly email: string;
  @ApiProperty({example: '1234567', description: 'password'})
  @IsString({message: 'Has to be a string'})
  @Length(4, 16, {message: 'Not less than 4, not more than 16'})
  readonly password: string;
}